module.exports = {
  name: 'shared-profile',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/shared/profile',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
