export type Coordinate = {
  latitude: number;
  longtitude: number;
};

export type City = {
  id: number
  name: string
  state: string
  country: string
  coordinate: Coordinate
  current: {
    temperature_2m: number
    interval: number
    time: string
  }
  elevation: number
};
