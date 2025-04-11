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
    print_tree: {
      library: name,
      retType: DataType.String,
      paramsType: [DataType.External],
    },
    delete_tree: {
      library: name,
      retType: DataType.Void,
      paramsType: [DataType.External],
    },
  });
};
