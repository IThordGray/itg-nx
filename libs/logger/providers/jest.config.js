module.exports = {
  name: 'logger-providers',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/logger/providers',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
