module.exports = {
  name: 'base-components',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/base-components',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
