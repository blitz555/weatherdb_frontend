export class City {
  _id: any;
  location: string;
  coords: {
    type: string;
    coordinates: number[];
  };
  timestamp_current: number;
  timestamp: number[];
  maxTempC: number[];
  minTempC: number[];
  weather: string[];
  precipMM: number[];
  snowCM: number[];
  uvi: number[];
  forecast: {
    timestamp: number[];
    maxTempC: number[];
    minTempC: number[];
    weather: string[];
    precipMM: number[];
    snowCM: number[];
    uvi: number[];
  };
}
