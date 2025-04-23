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
    get_value_tree: {
      library: name,
      retType: DataType.External,
      paramsType: [DataType.External],
    },
    has_error_tree: {
      library: name,
      retType: DataType.Boolean,
      paramsType: [DataType.External],
    },
    get_error_tree: {
      library: name,
      retType: DataType.String,
      paramsType: [DataType.External],
    },
    delete_response_tree: {
      library: name,
      retType: DataType.Void,
      paramsType: [DataType.External],
    },
  });
};
