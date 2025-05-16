import { Simplex } from '../simplex';

export interface GetSolutionRequestDto {
  expression: string;
}
export interface GetSolutionResponseDto {
  simplexes: Simplex[];
}
