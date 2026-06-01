export type Coordinate = {
  latitude: number;
  longitude: number;
};

export type City = {
  id: number
  key?: string
  type?: string
  value?: string
  postcode?: string
  housenumber?: number
  city: string
  street?: string
  district?: string
  state: string
  country: string
  countrycode?: string
  coordinate: Coordinate
  current: {
    temperature_2m: number
    interval: number
    time: string
  }
  elevation: number
};
