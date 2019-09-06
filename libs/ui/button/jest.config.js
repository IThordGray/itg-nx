module.exports = {
  name: 'ui-button',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/ui/button',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
