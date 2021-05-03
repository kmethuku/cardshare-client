module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Runs special logic, adding special
  // extended assertions to Jest
  // setupFilesAfterEnv: [
  //   '@testing-library/jest-dom/extend-expect',
  //   './globals.d.ts'
  // ],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}

// import type { Config } from '@jest/types'

// export default async (): Promise<Config.InitialOptions> => {
//   return {
//     verbose: true,
//     roots: ['<rootDir>'],
//     moduleDirectories: [
//       'node_modules',
//     ],
//     testMatch: [
//       '**/__tests__/**/*.+(ts|tsx|js)',
//       '**/?(*.)+(spec|test).+(ts|tsx|js)',
//     ],
//     transform: {
//       "^.+\\.js$": "babel-jest",
//       '^.+\\.(ts|tsx)$': 'ts-jest',
//     },
//     transformIgnorePatterns: [
//       '<rootDir>/node_modules',
//     ],
//     testEnvironment: 'node',
//     moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]

//   }
// };
// ,