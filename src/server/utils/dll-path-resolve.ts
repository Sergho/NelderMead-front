import path from 'path';
import { getEnv } from '../../common/utils/get-env';
import { DLL_ERROR } from '../../constants';

export const DLLPathResolve = (filename: string): string => {
  switch (getEnv()) {
    case 'dev':
      return path.resolve(__dirname, `../../../dist/backend/${filename}`);
    case 'prod':
      return path.resolve(__dirname, `../../backend/${filename}`);
    case 'app':
      return path.resolve(__dirname, `../../../../app.asar.unpacked/dist/backend/${filename}`);
    default:
      throw DLL_ERROR;
  }
};
