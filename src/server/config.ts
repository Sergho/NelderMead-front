import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../constants';
import { loadDLL } from './load-DLL';
import { DLLPathResolve } from './utils/DLLPathResolve';

export const DLL_PATH = DLLPathResolve('libNelderMead.so');
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
