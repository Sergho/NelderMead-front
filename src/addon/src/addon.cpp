#include <napi.h>

Napi::Value Divide(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  // Проверка аргументов
  if (info.Length() != 2) {
    Napi::TypeError::New(env, "Expected 2 arguments")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (!info[0].IsNumber() || !info[1].IsNumber()) {
    Napi::TypeError::New(env, "Arguments must be numbers")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  double a = info[0].As<Napi::Number>().DoubleValue();
  double b = info[1].As<Napi::Number>().DoubleValue();

  try {
    double result = a / b;  // Вызов функции из вашей библиотеки
    return Napi::Number::New(env, result);
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("divide", Napi::Function::New(env, Divide));
  return exports;
}

NODE_API_MODULE(mymath, Init)