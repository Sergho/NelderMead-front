#include "nelder-mead-wrapper.h"

#include "expression-tree-wrapper.h"

Napi::FunctionReference NelderMeadWrapper::constructor;

Napi::Object NelderMeadWrapper::Init(Napi::Env env, Napi::Object exports) {
  Napi::Function func = DefineClass(
      env, "NelderMeadMethod",
      {
          InstanceMethod("generateSimplex",
                         &NelderMeadWrapper::GenerateSimplex),
          InstanceMethod("setSimplex", &NelderMeadWrapper::SetSimplex),
          InstanceMethod("minimumSearch", &NelderMeadWrapper::MinimumSearch),
      });

  constructor = Napi::Persistent(func);
  constructor.SuppressDestruct();

  exports.Set("NelderMeadMethod", func);
  return exports;
}

NelderMeadWrapper::NelderMeadWrapper(const Napi::CallbackInfo& info)
    : Napi::ObjectWrap<NelderMeadWrapper>(info), method(nullptr) {
  Napi::Env env = info.Env();

  if (info.Length() < 1 || !info[0].IsObject()) {
    Napi::TypeError::New(env, "ExpressionTree instance expected")
        .ThrowAsJavaScriptException();
    return;
  }

  try {
    Napi::Object treeObj = info[0].As<Napi::Object>();
    ExpressionTreeWrapper* treeWrapper =
        Napi::ObjectWrap<ExpressionTreeWrapper>::Unwrap(treeObj);
    ExpressionTree* tree = treeWrapper->GetTreeInstance();

    double reflection = 1.0;
    double expansion = 2.0;
    double contraction = 0.5;
    double homothety = 0.5;
    double dispersion = 0.0001;

    if (info.Length() > 1 && info[1].IsObject()) {
      Napi::Object config = info[1].As<Napi::Object>();
      if (config.Has("reflection") && config.Get("reflection").IsNumber()) {
        reflection = config.Get("reflection").As<Napi::Number>().DoubleValue();
      }
      if (config.Has("expansion") && config.Get("expansion").IsNumber()) {
        expansion = config.Get("expansion").As<Napi::Number>().DoubleValue();
      }
      if (config.Has("contraction") && config.Get("contraction").IsNumber()) {
        contraction =
            config.Get("contraction").As<Napi::Number>().DoubleValue();
      }
      if (config.Has("homothety") && config.Get("homothety").IsNumber()) {
        homothety = config.Get("homothety").As<Napi::Number>().DoubleValue();
      }
      if (config.Has("dispersion") && config.Get("dispersion").IsNumber()) {
        dispersion = config.Get("dispersion").As<Napi::Number>().DoubleValue();
      }
    }

    method = new NelderMeadMethod(tree, reflection, expansion, contraction,
                                  homothety, dispersion);
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
  }
}

NelderMeadWrapper::~NelderMeadWrapper() {
  if (method) delete method;
}

Napi::Value NelderMeadWrapper::GenerateSimplex(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (!method) {
    Napi::Error::New(env, "NelderMeadMethod not initialized")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (info.Length() < 1 || !info[0].IsNumber()) {
    Napi::TypeError::New(env, "Number expected for step")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  try {
    double step = info[0].As<Napi::Number>().DoubleValue();
    std::vector<double> x0;

    if (info.Length() > 1 && info[1].IsArray()) {
      Napi::Array x0Array = info[1].As<Napi::Array>();
      for (uint32_t i = 0; i < x0Array.Length(); ++i) {
        Napi::Value val = x0Array[i];
        if (!val.IsNumber()) {
          Napi::TypeError::New(env, "x0 array must contain only numbers")
              .ThrowAsJavaScriptException();
          return env.Null();
        }
        x0.push_back(val.As<Napi::Number>().DoubleValue());
      }
    }

    method->generate_simplex(step, x0);
    return info.This();
  } catch (const std::invalid_argument& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value NelderMeadWrapper::SetSimplex(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (!method) {
    Napi::Error::New(env, "NelderMeadMethod not initialized")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  if (info.Length() < 1 || !info[0].IsArray()) {
    Napi::TypeError::New(env, "Array expected for simplex")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  try {
    Napi::Array simplexArray = info[0].As<Napi::Array>();
    std::vector<std::vector<double>> simplex;

    for (uint32_t i = 0; i < simplexArray.Length(); ++i) {
      Napi::Value rowVal = simplexArray[i];
      if (!rowVal.IsArray()) {
        Napi::TypeError::New(env, "Simplex must be array of arrays")
            .ThrowAsJavaScriptException();
        return env.Null();
      }

      Napi::Array rowArray = rowVal.As<Napi::Array>();
      std::vector<double> row;
      for (uint32_t j = 0; j < rowArray.Length(); ++j) {
        Napi::Value val = rowArray[j];
        if (!val.IsNumber()) {
          Napi::TypeError::New(env, "Simplex must contain only numbers")
              .ThrowAsJavaScriptException();
          return env.Null();
        }
        row.push_back(val.As<Napi::Number>().DoubleValue());
      }
      simplex.push_back(row);
    }

    method->set_simplex(simplex);
    return info.This();
  } catch (const std::invalid_argument& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}

Napi::Value NelderMeadWrapper::MinimumSearch(const Napi::CallbackInfo& info) {
  Napi::Env env = info.Env();

  if (!method) {
    Napi::Error::New(env, "NelderMeadMethod not initialized")
        .ThrowAsJavaScriptException();
    return env.Null();
  }

  int number_steps = 10000;
  if (info.Length() > 0 && info[0].IsNumber()) {
    number_steps = info[0].As<Napi::Number>().Int32Value();
  }

  try {
    auto simplex_history = method->minimum_search(number_steps);

    Napi::Array result = Napi::Array::New(env, simplex_history.size());
    for (size_t i = 0; i < simplex_history.size(); ++i) {
      Napi::Array simplex = Napi::Array::New(env, simplex_history[i].size());
      for (size_t j = 0; j < simplex_history[i].size(); ++j) {
        Napi::Array point = Napi::Array::New(env, simplex_history[i][j].size());
        for (size_t k = 0; k < simplex_history[i][j].size(); ++k) {
          point[k] = Napi::Number::New(env, simplex_history[i][j][k]);
        }
        simplex[j] = point;
      }
      result[i] = simplex;
    }

    return result;
  } catch (const std::exception& e) {
    Napi::Error::New(env, e.what()).ThrowAsJavaScriptException();
    return env.Null();
  }
}