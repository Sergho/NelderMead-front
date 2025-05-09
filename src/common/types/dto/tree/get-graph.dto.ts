import { GraphPoint } from '../../GraphPoint';
import { ValuedGraphPoint } from '../../ValuedGraphPoint';

// TODO replace expression by tree json
export interface GetGraphRequestDto {
  expression: string;
  from: GraphPoint;
  to: GraphPoint;
  interval: number;
}
export interface GetGraphResponseDto {
  points: ValuedGraphPoint[];
}
