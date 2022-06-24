/* eslint-disable */
export default {
  displayName: 'shared-filter-expressions',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash'
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
    '^.+\\.js$': 'babel-jest'
  },
  transformIgnorePatterns: [
    `node_modules/(?!lodash-es)`
  ],
  moduleFileExtensions: [ 'ts', 'js', 'html' ],
  coverageDirectory: '../../../coverage/libs/shared/filter-expressions'
};
