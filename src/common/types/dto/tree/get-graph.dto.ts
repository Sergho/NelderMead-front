// TODO replace expression by tree json
export interface GetGraphRequestDto {
  expression: string;
  from: number;
  to: number;
  interval: number;
}
export interface GetGraphResponseDto {
  x: number[];
  y: number[];
  z?: number[];
}
