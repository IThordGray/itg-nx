module.exports = {
  name: 'ui-components-text-box',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ui/components/text-box',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
