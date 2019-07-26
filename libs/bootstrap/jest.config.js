module.exports = {
  name: 'bootstrap',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/bootstrap',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
