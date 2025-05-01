import { Request, Response } from 'express';
import { GraphPoint } from '../GraphPoint';
import { ValuesGraphPoint } from '../ValuedGraphPoint';

// TODO replace expression by tree json
export type GetGraphRequest = Request<
  object,
  object,
  object,
  {
    expression: string;
    from: GraphPoint;
    to: GraphPoint;
    interval: number;
  }
>;

export type GetGraphResponse = Response<{ points: ValuesGraphPoint[] } | { message: string }>;
