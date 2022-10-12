/** @type {import('@types/mocha').Mocha.MochaOptions} */
module.exports = {
    spec: './tests/**/*.ts',
    file: [
        './mocha.setup.ts'
    ],
    timeout: 10000,
}
