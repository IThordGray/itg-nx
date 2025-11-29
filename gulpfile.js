const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const readWorkspaceConfig = require('@nx/workspace').readWorkspaceConfig;
const readPackageJson = require('@nx/workspace').readPackageJson;

const execAsync = promisify(exec);

// Get workspace configuration
const { version } = readPackageJson();
const { projects } = readWorkspaceConfig({ format: 'nx' });

// Filter for public libraries (those with a publish target)
function getPublicLibraries() {
  return Object.values(projects)
    ?.filter((x) => x.projectType === 'library' && x.targets?.publish)
    .map((x) => x.name);
}

// Function to find package.json path for a library
function findPackageJsonPath(libraryName) {
  const project = Object.values(projects).find((p) => p.name === libraryName);
  if (!project) {
    return null;
  }

  // Try to find package.json in common locations
  const possiblePaths = [];
  
  // If project has a root property, use it
  if (project.root) {
    possiblePaths.push(path.join(project.root, 'package.json'));
  }
  
  // Try based on sourceRoot (package.json is usually in parent of src)
  if (project.sourceRoot) {
    const sourceRootDir = path.dirname(project.sourceRoot);
    possiblePaths.push(path.join(sourceRootDir, 'package.json'));
  }
  
  // Fallback: try to construct path from project name
  const nameParts = libraryName.split('-');
  if (nameParts.length >= 2) {
    const libPath = path.join('libs', nameParts[0], nameParts.slice(1).join('-'), 'package.json');
    possiblePaths.push(libPath);
  }

  // Find the first existing path
  for (const packageJsonPath of possiblePaths) {
    const normalizedPath = path.normalize(packageJsonPath);
    if (fs.existsSync(normalizedPath)) {
      return normalizedPath;
    }
  }
  
  return null;
}

// Function to get build output path for a library
function getBuildOutputPath(libraryName) {
  const project = Object.values(projects).find((p) => p.name === libraryName);
  if (!project || !project.targets?.build?.options?.outputPath) {
    return null;
  }
  return project.targets.build.options.outputPath;
}

// Function to update package.json version for a library
function updateLibraryVersion(libraryName) {
  const packageJsonPath = findPackageJsonPath(libraryName);
  
  if (!packageJsonPath) {
    console.warn(`Could not find package.json for ${libraryName}`);
    return;
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = version;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated ${libraryName} version to ${version} in ${packageJsonPath}`);
  } catch (error) {
    console.error(`Error updating ${packageJsonPath}:`, error.message);
  }
}

// Function to align all library versions
function alignLibraryVersions() {
  const publicLibraries = getPublicLibraries();
  console.log(`Aligning versions of ${publicLibraries.length} public libraries to ${version}...`);
  publicLibraries.forEach((libName) => {
    updateLibraryVersion(libName);
  });
}

// Gulp task: build-libraries
function buildLibrariesTask(done) {
  const publicLibraries = getPublicLibraries();
  
  if (publicLibraries.length === 0) {
    console.log('No public libraries found to build');
    return done();
  }

  alignLibraryVersions();
  
  const buildCmd = `nx run-many -t build -p ${publicLibraries.join(' ')}`;
  console.log(`Building ${publicLibraries.length} public libraries: ${publicLibraries.join(', ')}`);
  
  execAsync(buildCmd)
    .then(() => {
      console.log('Build completed successfully');
      done();
    })
    .catch((error) => {
      console.error('Error building libraries:', error.message);
      done(error);
    });
}

// Gulp task: pack-libraries
function packLibrariesTask(done) {
  const publicLibraries = getPublicLibraries();
  
  if (publicLibraries.length === 0) {
    console.log('No public libraries found to pack');
    return done();
  }

  console.log(`Packing ${publicLibraries.length} public libraries...`);
  
  const packPromises = publicLibraries.map((libName) => {
    const outputPath = getBuildOutputPath(libName);
    
    if (!outputPath) {
      console.warn(`Could not find build output path for ${libName}`);
      return Promise.resolve();
    }

    if (!fs.existsSync(outputPath)) {
      console.warn(`Build output directory does not exist for ${libName}: ${outputPath}`);
      return Promise.resolve();
    }

    // Update version in dist package.json before packing
    const distPackageJsonPath = path.join(outputPath, 'package.json');
    if (fs.existsSync(distPackageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf8'));
        packageJson.version = version;
        fs.writeFileSync(distPackageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      } catch (error) {
        console.error(`Error updating dist package.json for ${libName}:`, error.message);
      }
    }

    console.log(`Packing ${libName} from ${outputPath}...`);
    return execAsync('npm pack', { cwd: outputPath })
      .then(() => {
        console.log(`Successfully packed ${libName}`);
      })
      .catch((error) => {
        console.error(`Error packing ${libName}:`, error.message);
        throw error;
      });
  });

  Promise.all(packPromises)
    .then(() => {
      console.log('All libraries packed successfully');
      done();
    })
    .catch((error) => {
      console.error('Error packing libraries:', error.message);
      done(error);
    });
}

// Gulp task: publish-libraries
function publishLibrariesTask(done) {
  const publicLibraries = getPublicLibraries();
  
  if (publicLibraries.length === 0) {
    console.log('No public libraries found to publish');
    return done();
  }

  console.log(`Publishing ${publicLibraries.length} public libraries...`);
  
  const publishPromises = publicLibraries.map((libName) => {
    const outputPath = getBuildOutputPath(libName);
    
    if (!outputPath) {
      console.warn(`Could not find build output path for ${libName}`);
      return Promise.resolve();
    }

    if (!fs.existsSync(outputPath)) {
      console.warn(`Build output directory does not exist for ${libName}: ${outputPath}`);
      return Promise.resolve();
    }

    // Update version in dist package.json before publishing
    const distPackageJsonPath = path.join(outputPath, 'package.json');
    if (fs.existsSync(distPackageJsonPath)) {
      try {
        const packageJson = JSON.parse(fs.readFileSync(distPackageJsonPath, 'utf8'));
        packageJson.version = version;
        fs.writeFileSync(distPackageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
      } catch (error) {
        console.error(`Error updating dist package.json for ${libName}:`, error.message);
      }
    }

    console.log(`Publishing ${libName} from ${outputPath}...`);
    return execAsync('npm publish', { cwd: outputPath })
      .then(() => {
        console.log(`Successfully published ${libName}`);
      })
      .catch((error) => {
        console.error(`Error publishing ${libName}:`, error.message);
        throw error;
      });
  });

  Promise.all(publishPromises)
    .then(() => {
      console.log('All libraries published successfully');
      done();
    })
    .catch((error) => {
      console.error('Error publishing libraries:', error.message);
      done(error);
    });
}

// Export Gulp tasks (Gulp v4 syntax)
exports['build-libraries'] = buildLibrariesTask;
exports['pack-libraries'] = packLibrariesTask;
exports['publish-libraries'] = publishLibrariesTask;
