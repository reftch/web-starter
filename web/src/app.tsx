import { useEffect, useState } from "preact/hooks";
import { Content } from "./components/content";
import { Header, HeaderSearch, HeaderTitle } from "./components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import type { City } from "./model";
import { Button } from "./components/ui/button";

export function App() {
  const [city, setCity] = useState<City>();

  useEffect(() => {
    const json = sessionStorage.getItem("city-session");
    if (json) {
      onSearch(JSON.parse(json))
    }
  }, []);

  const onSearch = (city: City) => {
    if (city) {
      // console.log("Meteo for city:", city);
      sessionStorage.setItem("city-session", JSON.stringify(city));

      fetch(`/api/v1/temperature?latidude=${city.coordinate.latitude}&longtitude=${city.coordinate.longtitude}`)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          city.current = json.current;
          city.elevation = json.elevation;
          setCity(city);
        })
    }
  }

  return (
    <>
      <section id="center" className="flex justify-center">
        <div className="max-w-6xl w-full">
          <Header>
            <HeaderTitle>Weather Service</HeaderTitle>
            <HeaderSearch onSearch={(city) => onSearch(city as City)} />
            <Button variant="default" disabled>Sign In</Button>
          </Header>

          <Content>
            {city?.name ? (
              <Card className="w-full">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b  sm:flex-row">
                  <div className="grid flex-1 gap-1">
                    <CardTitle className="text-xl">{city.name}</CardTitle>
                    <CardDescription>{city.state ? `${city.state}, ${city.country}` : city.country}</CardDescription>
                  </div>
                  <div className="px-3">{new Date().toLocaleString('de')}</div>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-2 h-12 items-center">
                  <div className="px-3 text-2xl">{city?.current.temperature_2m}°</div>
                </CardContent>
              </Card>
            ) : null}
          </Content>

        </div>
      </section>
    </>
  )
}
