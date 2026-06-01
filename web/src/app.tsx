import { useEffect, useState } from "preact/hooks";
import { BasicCard, SkeletonCard } from "./components/basic";
import { Content } from "./components/content";
import { Header, HeaderSearch, HeaderTitle } from "./components/header";
import { Button } from "./components/ui/button";
import type { City } from "./lib/model";

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


      fetch(`/api/v1/temperature?latidude=${city.coordinate.latitude}&longtitude=${city.coordinate.longitude}`)
        .then((response) => response.json())
        .then((json) => {
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
            {city ? <BasicCard city={city} /> : <SkeletonCard />}
          </Content>

        </div>
      </section>
    </>
  )
}

