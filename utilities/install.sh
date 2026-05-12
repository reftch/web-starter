#!/bin/sh
# install http-server

mkdir tmp
cd tmp

git clone --depth=1 https://github.com/reftch/http-server-cpp

cd http-server-cpp

cmake -S . -B build -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=/usr/local
cmake --build build
cmake --install build
