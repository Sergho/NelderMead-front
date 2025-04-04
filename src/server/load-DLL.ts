import { DataType, define, open } from 'ffi-rs';

export const loadDLL = (name: string, path: string) => {
  open({
    library: name,
    path: path,
  });
  return define({
    NM_addition: {
      library: name,
      retType: DataType.Double,
      paramsType: [DataType.Double, DataType.Double],
    },
  });
};
