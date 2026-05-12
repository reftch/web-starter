#include <iomanip>
#include <sstream>

#include "server.hpp"

int main() {
    http::server s("127.0.0.1", 8080);
    // server handlers
    s.path("GET", "/",
           [](const std::string&, const auto&) {
               auto content = read_file("./static/index.html");
               return http::response::create(http::response::content_type::HTML, content);
           })
        .path("GET", "/home",
              [](const std::string&, const auto&) {
                  auto content = read_file("./static/home.html");
                  return http::response::create(http::response::content_type::HTML, content);
              })
        .path("GET", "/api/v1/time",
              [](const std::string&, const auto&) {
                  auto now = std::chrono::system_clock::now();
                  auto time_t = std::chrono::system_clock::to_time_t(now);

                  std::stringstream ss;
                  ss << std::put_time(std::localtime(&time_t), "%H:%M:%S");
                  return http::response::json("{\"time\":\"" + ss.str() + "\"}");
              })
        .start();

    return 0;
}