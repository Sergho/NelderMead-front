import { Response } from 'express';

export type DtoResponse<DTO> = Response<DTO | { message: string }>;
