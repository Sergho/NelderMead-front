export interface GetSolutionRequestDto {
  expression: string;
}
export interface GetSolutionResponseDto {
  simplexes: { x: number[]; y: number[]; z?: number[] }[];
}
