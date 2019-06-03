module.exports = {
  name: 'app1',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/app1',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
