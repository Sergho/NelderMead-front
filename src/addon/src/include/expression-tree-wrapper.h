#pragma once

#include <napi.h>

#include "expression_tree.h"

class ExpressionTreeWrapper : public Napi::ObjectWrap<ExpressionTreeWrapper> {
 public:
  static Napi::Object Init(Napi::Env env, Napi::Object exports);
  ExpressionTreeWrapper(const Napi::CallbackInfo& info);
  ~ExpressionTreeWrapper();

  ExpressionTree* GetTreeInstance() { return tree; }

 private:
  static Napi::FunctionReference constructor;
  ExpressionTree* tree;

  static Napi::Value CreateTree(const Napi::CallbackInfo& info);
  Napi::Value Evaluate(const Napi::CallbackInfo& info);
  Napi::Value CheckNumberVariables(const Napi::CallbackInfo& info);
  Napi::Value JsonTree(const Napi::CallbackInfo& info);
  Napi::Value GetNumberVariables(const Napi::CallbackInfo& info);
};
