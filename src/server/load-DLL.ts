import { DataType, define, open } from 'ffi-rs';

export const loadDLL = (name: string, path: string) => {
  open({
    library: name,
    path: path,
  });
  return define({
    create_tree: {
      library: name,
      retType: DataType.External,
      paramsType: [DataType.String],
    },
  });
};
