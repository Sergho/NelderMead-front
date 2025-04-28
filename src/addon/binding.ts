// eslint-disable-next-line @typescript-eslint/no-require-imports
const addon = require('../addon/build/Release/mymath.node');

type DivideType = (a: number, b: number) => number;

export const divide: DivideType = addon.divide;
