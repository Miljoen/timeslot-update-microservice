import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        './src/**/*.ts',
    ],
    moduleNameMapper: {
        '^@app-database/(.*)$': '<rootDir>/src/database/$1',
        '^@app-graphql/(.*)$': '<rootDir>/src/graphql/$1',
        '^@app-types/(.*)$': '<rootDir>/src/types/$1',
    },
    setupFiles: [
        '<rootDir>/test/setup/environment.setup.ts',
    ],
    coverageDirectory: 'coverage',
}

export default config
