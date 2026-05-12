# Stage 1: Build stage
FROM ubuntu:latest AS build

# Install build-essential for compiling C++ code
RUN apt-get update && apt-get install -y build-essential cmake git

# Set the working directory
WORKDIR /app

# Copy the source code into the container
COPY . .
RUN ./utilities/install.sh

# Compile in release mode  
RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
RUN cmake --build build

# Stage 2: Runtime stage
FROM scratch
# FROM alpine:3 AS release-stage 
# RUN apk add --no-cache gcompat

# Copy the static binary from the build stage
COPY --from=build /app/build/web-starter /web-starter
COPY --from=build /app/build/static /static

# Command to run the binary
CMD ["/web-starter"]