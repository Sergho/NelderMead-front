import path from 'path';
import cors from 'cors';
import { HOST, FRONTEND_PORT } from '../settings';
import { loadDLL } from './load-DLL';

export const DLL_PATH = path.resolve(__dirname, '../../build/libNelderMead.so');
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
