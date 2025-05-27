#include <napi.h>

#include "expression-tree-wrapper.h"
#include "nelder-mead-wrapper.h"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  ExpressionTreeWrapper::Init(env, exports);
  NelderMeadWrapper::Init(env, exports);
  return exports;
}

NODE_API_MODULE(nelder_mead_addon, Init)