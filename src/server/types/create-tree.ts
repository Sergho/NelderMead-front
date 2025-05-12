import { Request, Response } from 'express';

export type CreateTreeRequest = Request<
  object,
  object,
  object,
  {
    expression: string;
  }
>;

export type CreateTreeResponse = Response<{ tree: string } | { message: string }>;
