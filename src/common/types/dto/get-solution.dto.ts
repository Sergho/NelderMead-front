export interface GetSolutionRequestDto {
  expression: string;
}
export interface GetSolutionResponseDto {
  simplexes: number[][][];
}
