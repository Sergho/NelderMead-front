import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../constants';
import { loadDLL } from './load-DLL';
import { DLLPathResolve } from './utils/dll-path-resolve';

export const DLL_PATH = DLLPathResolve('libNelderMead.so');
export const CORS = cors({
  origin: `${HOST}:${FRONTEND_PORT}`,
});
export const LIB = loadDLL('nelder-mead', DLL_PATH);
