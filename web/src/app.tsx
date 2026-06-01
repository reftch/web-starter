import { useEffect, useState } from "preact/hooks";
import { Content } from "./components/content";
import { Header, HeaderSearch, HeaderTitle } from "./components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import type { City } from "./lib/model";
import { Button } from "./components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import CityPanel from "./components/citypanel";

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
      console.log("Meteo for city:", city);
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
            {city ? (
              <Card className="w-full">
                <CardHeader className="flex items-center gap-2 space-y-0 border-b  sm:flex-row">
                  <div className="grid flex-1 gap-1 px-3">
                    <CardTitle className="text-xl">{city.city}</CardTitle>
                    <CardDescription>{city.state ? `${city.state}, ${city.country}` : city.country}</CardDescription>
                  </div>
                  <div className="px-3">{new Date().toLocaleString('de')}</div>
                </CardHeader>
                <CardContent className="items-center">
                  <div className="px-3 text-2xl pb-3">{city?.current.temperature_2m}°</div>
                  <Collapsible className="rounded-md data-[state=open]:bg-muted">
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="group">
                        Place details
                        <ChevronDownIcon className="ml-auto group-data-[state=open]:rotate-180" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col items-start gap-2 p-2.5 pt-0 text-sm">
                      <div>
                        <CityPanel city={city} />
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>
            ) : null}
          </Content>

        </div>
      </section>
    </>
  )
}
