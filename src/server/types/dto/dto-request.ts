import { Request } from 'express';

export type DtoRequest<DTO> = Request<object, object, object, DTO>;
