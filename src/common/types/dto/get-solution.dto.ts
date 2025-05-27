import { Params } from '../params.interface';
import { Simplex } from '../simplex';

export interface GetSolutionRequestDto {
  expression: string;
  params: Params;
}
export interface GetSolutionResponseDto {
  simplexes: Simplex[];
}
