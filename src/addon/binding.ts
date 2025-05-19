// eslint-disable-next-line @typescript-eslint/no-require-imports
const addon = require('../addon/build/Release/nelder_mead_addon.node');

export interface ExpressionTree {
  evaluate(point: number[]): number;
  checkNumberVariables(expected: number): boolean;
  jsonTree(): string;
  getNumberVariables(): number;
}

export interface NelderMeadMethod {
  generateSimplex(step: number, x0?: number[]): void;
  setSimplex(simplex: number[][]): void;
  minimumSearch(numberSteps?: number): number[][][];
}

export interface NelderMeadConfig {
  reflection?: number;
  expansion?: number;
  contraction?: number;
  homothety?: number;
  dispersion?: number;
}

export const ExpressionTree: {
  createTree: (expression: string) => ExpressionTree;
} = addon.ExpressionTree;

export const NelderMeadMethod: {
  new (tree: ExpressionTree, config?: NelderMeadConfig): NelderMeadMethod;
} = addon.NelderMeadMethod;
