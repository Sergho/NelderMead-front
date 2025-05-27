import { Response } from 'express';
import { ErrorDto } from '../../../common/types/dto/error.dto';

export type DtoResponse<DTO> = Response<DTO | ErrorDto>;
