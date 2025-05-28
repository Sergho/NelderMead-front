import { Params } from '../params';
import { Simplex } from '../simplex';
import { SimplexParams } from '../simplex-params';

export interface GetSolutionRequestDto {
  expression: string;
  params: Params;
  startSimplex: SimplexParams;
}
export interface GetSolutionResponseDto {
  simplexes: Simplex[];
}
