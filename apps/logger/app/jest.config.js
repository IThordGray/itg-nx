module.exports = {
  name: 'logger-app',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/apps/logger/app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
