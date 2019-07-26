module.exports = {
  name: 'transport-service',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/transport/service',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
