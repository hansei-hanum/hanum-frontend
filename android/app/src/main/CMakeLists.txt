# Sets the minimum version of CMake required
cmake_minimum_required(VERSION 3.4.1)

# Use C++20 standard
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add native library
add_library(
        native-lib
        SHARED
        native-lib.cpp
)

# Find log library
find_library(log-lib log)

# Link the native library with the log library
target_link_libraries(native-lib ${log-lib})
