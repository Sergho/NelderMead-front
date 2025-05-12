#pragma once

#include <napi.h>

#include "nelder_mead_method.h"

class NelderMeadWrapper : public Napi::ObjectWrap<NelderMeadWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  NelderMeadWrapper(const Napi::CallbackInfo& info);
  ~NelderMeadWrapper();

 private:
  static Napi::FunctionReference constructor;
  NelderMeadMethod* method;

  Napi::Value GenerateSimplex(const Napi::CallbackInfo& info);
  Napi::Value SetSimplex(const Napi::CallbackInfo& info);
  Napi::Value MinimumSearch(const Napi::CallbackInfo& info);
};
