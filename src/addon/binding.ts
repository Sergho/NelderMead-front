// eslint-disable-next-line @typescript-eslint/no-require-imports
const addon = require('../addon/build/Release/mymath.node');

export interface ExpressionTreeClass {
  createTree(expression: string): ExpressionTreeObject;
}

export interface ExpressionTreeObject {
  evaluate(point: number[]): number;
  checkNumberVariables(expected: number): boolean;
  jsonTree(): string;
  getNumberVariables(): number;
}

export const ExpressionTree: ExpressionTreeClass = addon.ExpressionTree;
