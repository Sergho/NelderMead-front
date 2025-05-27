import { GraphPoints } from '../graph-points';

export interface GetGraphRequestDto {
  expression: string;
  from: number;
  to: number;
  interval: number;
}
export interface GetGraphResponseDto {
  points: GraphPoints;
}
