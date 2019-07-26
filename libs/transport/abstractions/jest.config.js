module.exports = {
  name: 'transport-abstractions',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/transport/abstractions',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
