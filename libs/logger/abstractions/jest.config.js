module.exports = {
  name: 'logger-abstractions',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/logger/abstractions',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
