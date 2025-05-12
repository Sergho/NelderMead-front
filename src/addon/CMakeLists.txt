cmake_minimum_required(VERSION 3.10)
project(nelder_mead_addon LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

include(FetchContent)

FetchContent_Declare(
    nlohmann_json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.12.0
)

FetchContent_MakeAvailable(nlohmann_json)

include_directories(
  ${CMAKE_JS_INC}
  ${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/node-addon-api
)
link_directories(${CMAKE_JS_LIB})

add_library(${PROJECT_NAME} SHARED
  src/addon.cpp
)

target_include_directories(${PROJECT_NAME} PUBLIC
  ${NAPI_INCLUDES}
  "${CMAKE_CURRENT_SOURCE_DIR}/../../node_modules/node-addon-api"
  ${CMAKE_CURRENT_SOURCE_DIR}/include
)

target_link_libraries(${PROJECT_NAME} PRIVATE
  nlohmann_json::nlohmann_json
  ${CMAKE_CURRENT_SOURCE_DIR}/lib/libNelderMead.so
  ${CMAKE_JS_LIBRARY}
)

set_target_properties(${PROJECT_NAME} PROPERTIES
  PREFIX ""
  SUFFIX ".node"
  OUTPUT_NAME "${PROJECT_NAME}"
)