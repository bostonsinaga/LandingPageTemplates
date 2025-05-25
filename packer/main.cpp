#include <iostream>
#include <rapidjson/document.h>
#include <rapidjson/writer.h>
#include <rapidjson/stringbuffer.h>

int main() {
  const char* json = "{\"name\":\"Boston\",\"age\":27}";

  rapidjson::Document doc;
  doc.Parse(json);

  if (doc.HasMember("name")) {
    std::cout << "Name: " << doc["name"].GetString() << std::endl;
  }

  return 0;
}
