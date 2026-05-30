import { useState } from "preact/hooks";
import { Content } from "./components/content";
import { Header, HeaderSearch, HeaderTitle } from "./components/header";
import { Card, CardContent } from "./components/ui/card";

export function App() {
  const [temperature, setTemperature] = useState<string>('');
  const [elevation, setElevation] = useState<string>('');

  const onSearch = (value: string) => {
    console.log("Searching for:", value)
    const [lat, lng] = value.split(',').map(Number);

    fetch(`/api/v1/temperature?latidude=${lat}&longtitude=${lng}`)
      .then((response) => response.json())
      .then((json) => {
        setTemperature(`${json.current.temperature_2m}°C`);
        setElevation(`${json.elevation}m`);
      })
  }

  return (
    <>
      <section id="center" className="flex justify-center">
        <div className="max-w-6xl w-full">
          <Header>
            <HeaderTitle>Weather Service</HeaderTitle>
            <HeaderSearch onSearch={(value) => onSearch(value as string)} />
          </Header>

          <Content>
            <Card className="w-full max-w-sm">
              <CardContent className="grid p-2 md:grid-cols-2">
                <div className="font-semibold">Temperature:</div>
                <div>{temperature}</div>
                <div className="font-semibold">Elevation:</div>
                <div>{elevation}</div>
              </CardContent>
            </Card>
          </Content>

        </div>
      </section>
    </>
  )
}
