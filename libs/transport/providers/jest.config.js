module.exports = {
  name: 'transport-providers',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/transport/providers',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
