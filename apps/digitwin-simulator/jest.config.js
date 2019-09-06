module.exports = {
  name: 'digitwin-simulator',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/digitwin-simulator',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
