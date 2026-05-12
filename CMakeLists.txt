cmake_minimum_required(VERSION 3.10)
project(web-starter)

# Set C++ standard
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find all source files in src directory
file(GLOB SOURCES "src/*.cpp")

# Add executable
add_executable(web-starter ${SOURCES})

# Find and link the local library
add_library(http-server STATIC IMPORTED)
set_target_properties(http-server PROPERTIES
    IMPORTED_LOCATION /usr/local/lib/http-server/libhttp-server.a
    INTERFACE_INCLUDE_DIRECTORIES /usr/local/include/http-server
)

# Link the library to your executable
target_link_libraries(web-starter http-server)

file(COPY static DESTINATION ${CMAKE_BINARY_DIR})
