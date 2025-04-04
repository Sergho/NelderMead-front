import path from 'path';
import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../settings';
import { loadDLL } from './load-DLL';
import { getEnv } from '../common/utils/getEnv';

export const DLL_PATH =
  getEnv() === 'dev'
    ? path.resolve(__dirname, '../../dist/backend/libNelderMead.so')
    : path.join(
        __dirname,
        '../../../',
        'app.asar.unpacked',
        'dist',
        'backend',
        'libNelderMead.so'
      );
export const CORS = cors({
  origin: `${HOST}:${FRONTEND_PORT}`,
});
export const LIB = loadDLL(DLL_PATH, 'calculator');
export const ROUTES = {
  '/addition': LIB.NM_addition,
  '/subtraction': LIB.NM_subtraction,
  '/multiplication': LIB.NM_multiplication,
  '/division': LIB.NM_division,
};
