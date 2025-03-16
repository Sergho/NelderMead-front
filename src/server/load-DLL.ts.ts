import { DataType, define, open } from 'ffi-rs';
import { DLL_PATH } from './settings';

export const loadDLL = (name: string, path: string) => {
  open({
    library: name,
    path: DLL_PATH,
  });
  return define({
    NM_addition: {
      library: name,
      retType: DataType.Double,
      paramsType: [DataType.Double, DataType.Double],
    },
    NM_subtraction: {
      library: name,
      retType: DataType.Double,
      paramsType: [DataType.Double, DataType.Double],
    },
    NM_multiplication: {
      library: name,
      retType: DataType.Double,
      paramsType: [DataType.Double, DataType.Double],
    },
    NM_division: {
      library: name,
      retType: DataType.Double,
      paramsType: [DataType.Double, DataType.Double],
    },
  });
};
