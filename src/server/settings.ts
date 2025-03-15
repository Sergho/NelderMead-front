import { Library } from 'ffi-napi';
import path from 'path';
import cors from 'cors';
import { config } from 'dotenv';

config();

export const DLL_PATH = path.resolve(__dirname, '../../build/libNelderMead');
export const LIB = Library(DLL_PATH, {
  NM_addition: ['double', ['double', 'double']],
  NM_subtraction: ['double', ['double', 'double']],
  NM_multiplication: ['double', ['double', 'double']],
  NM_division: ['double', ['double', 'double']],
});
export const CORS = cors({
  origin: `${process.env.HOST}:${process.env.FRONTEND_PORT}`,
});
export const ROUTES = {
  '/addition': LIB.NM_addition,
  '/subtraction': LIB.NM_subtraction,
  '/multiplication': LIB.NM_multiplication,
  '/division': LIB.NM_division,
};
