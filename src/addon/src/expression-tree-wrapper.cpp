#include "expression-tree-wrapper.h"

Napi::FunctionReference ExpressionTreeWrapper::constructor;

Napi::Object ExpressionTreeWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func = DefineClass(
      env, "ExpressionTree",
      {
          StaticMethod("createTree", &ExpressionTreeWrapper::CreateTree),
          InstanceMethod("evaluate", &ExpressionTreeWrapper::Evaluate),
          InstanceMethod("checkNumberVariables",
                         &ExpressionTreeWrapper::CheckNumberVariables),
          InstanceMethod("jsonTree", &ExpressionTreeWrapper::JsonTree),
          InstanceMethod("getNumberVariables",
                         &ExpressionTreeWrapper::GetNumberVariables),
      });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("ExpressionTree", func);
  return exports;
}

ExpressionTreeWrapper::ExpressionTreeWrapper(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<ExpressionTreeWrapper>(info) {}

ExpressionTreeWrapper::~ExpressionTreeWrapper() {
  if (tree != nullptr) {
    delete tree;
  }
}

Napi::Value ExpressionTreeWrapper::CreateTree(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsString()) {
    Napi::TypeError::New(env, "String expected").ThrowAsJavaScriptException();
    return env.Null();
  }

  try {
    std::string function_str = info[0].As<Napi::String>().Utf8Value();
    ExpressionTree* tree = ExpressionTree::create_tree(function_str);

    Napi::Object obj = constructor.New({});
    ExpressionTreeWrapper* wrapper =
        Napi::ObjectWrap<ExpressionTreeWrapper>::Unwrap(obj);
    wrapper->tree = tree;

    return obj;
  } catch (const std::invalid_argument& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value ExpressionTreeWrapper::Evaluate(const Napi::CallbackInfo& info) {
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

    double result = tree->evaluate(variables);
    return Napi::Number::New(env, result);
  } catch (const std::invalid_argument& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value ExpressionTreeWrapper::CheckNumberVariables(
    const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    return env.Null();
  }

  try {
    int number = info[0].As<Napi::Number>().Int32Value();
    bool result = tree->check_number_variables(number);
    return Napi::Boolean::New(env, result);
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value ExpressionTreeWrapper::JsonTree(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  try {
    std::string json = tree->json_tree();
    return Napi::String::New(env, json);
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value ExpressionTreeWrapper::GetNumberVariables(
    const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();
  try {
    int number = tree->get_number_variables();
    return Napi::Number::New(env, number);
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}