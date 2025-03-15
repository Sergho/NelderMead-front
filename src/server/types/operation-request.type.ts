import { Request } from 'express';
import { OperationDTO } from './operation.dto';

export type OperationRequest = Request<{}, {}, {}, OperationDTO>;
