#include <napi.h>

#include <vector>

#include "expression_tree.h"

class NelderMeadAddon : public Napi::ObjectWrap<NelderMeadAddon> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports) {
    Napi::Function func =
        DefineClass(env, "ExpressionTree",
                    {StaticMethod("createTree", &NelderMeadAddon::CreateTree),
                     InstanceMethod("evaluate", &NelderMeadAddon::Evaluate),
                     InstanceMethod("checkNumberVariables",
                                    &NelderMeadAddon::CheckNumberVariables),
                     InstanceMethod("jsonTree", &NelderMeadAddon::JsonTree),
                     InstanceMethod("getNumberVariables",
                                    &NelderMeadAddon::GetNumberVariables)});

    constructor = Napi::Persistent(func);
    constructor.SuppressDestruct();

    exports.Set("ExpressionTree", func);
    return exports;
  }

  NelderMeadAddon(const Napi::CallbackInfo& info)
      : Napi::ObjectWrap<NelderMeadAddon>(info) {}

  ~NelderMeadAddon() {
    if (tree != nullptr) {
      delete tree;
    }
  }

 private:
  static Napi::FunctionReference constructor;
  ExpressionTree* tree;

  static Napi::Value CreateTree(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsString()) {
      Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
      return env.Null();
    }

    try {
      std::string function_str = info[0].As<Napi::String>().Utf8Value();
      ExpressionTree* tree = ExpressionTree::create_tree(function_str);

      Napi::Object obj = constructor.New({});
      NelderMeadAddon* wrapper = Napi::ObjectWrap<NelderMeadAddon>::Unwrap(obj);
      wrapper->tree = tree;

      return obj;
    } catch (const std::invalid_argument& e) {
      Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
      return env.Null();
    }
  }

  Napi::Value Evaluate(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsArray()) {
      Napi::TypeError::New(env, "Array of numbers expected")
          .ThrowAsJavaScriptException();
      return env.Null();
    }

    try {
      Napi::Array variablesArray = info[0].As<Napi::Array>();
      std::vector<double> variables;

      for (uint32_t i = 0; i < variablesArray.Length(); ++i) {
        Napi::Value val = variablesArray[i];
        if (!val.IsNumber()) {
          Napi::TypeError::New(env, "Array must contain only numbers")
              .ThrowAsJavaScriptException();
          return env.Null();
        }
        variables.push_back(val.As<Napi::Number>().DoubleValue());
      }

      double result = tree->evaluate(tree->get_number_variables(), variables);
      return Napi::Number::New(env, result);
    } catch (const std::invalid_argument& e) {
      Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
      return env.Null();
    }
  }

  Napi::Value CheckNumberVariables(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    if (info.Length() < 1 || !info[0].IsNumber()) {
      Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
      return env.Null();
    }

    int number = info[0].As<Napi::Number>().Int32Value();
    bool result = tree->check_number_variables(number);
    return Napi::Boolean::New(env, result);
  }

  Napi::Value JsonTree(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    std::string json = tree->json_tree();
    return Napi::String::New(env, json);
  }

  Napi::Value GetNumberVariables(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    int number = tree->get_number_variables();
    return Napi::Number::New(env, number);
  }
};

Napi::FunctionReference NelderMeadAddon::constructor;

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  return NelderMeadAddon::Init(env, exports);
}

NODE_API_MODULE(nelder_mead_addon, Init)