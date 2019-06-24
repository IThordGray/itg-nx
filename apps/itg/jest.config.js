module.exports = {
  name: 'itg',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/itg',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
