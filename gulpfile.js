const exec = require('child_process').exec;

const readWorkspaceConfig = require('@nrwl/workspace').readWorkspaceConfig;
const readPackageJson = require('@nrwl/workspace').readPackageJson;

function execAsync(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

const {version} = readPackageJson();
const {projects} = readWorkspaceConfig({format: "nx"})

const libraries = Object.values(projects)?.filter(x => x.projectType === 'library').map(x => x.name);

function buildLibraries() {
  let buildCmd = 'nx run-many -t build -p ';
  buildCmd += libraries.join(' ');
  return execAsync(buildCmd);
}

buildLibraries();
