import { Request, Response } from 'express';
import { JsExternal } from 'ffi-rs';

export type CreateTreeRequest = Request<
  object,
  object,
  object,
  {
    expression: string;
  }
>;

export type CreateTreeResponse = Response<{ pointer: JsExternal }>;
