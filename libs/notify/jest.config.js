module.exports = {
  name: 'notify',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/notify',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
