module.exports = {
  name: 'ui-styles',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/styles',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
