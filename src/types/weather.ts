export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  clouds?: {
    all: number;
  };
  rain?: {
    '1h': number;
  };
  snow?: {
    '1h': number;
  };
}

export interface CityItem {
  name: string;
  country: string;
  state?: string;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type Theme = 'light' | 'dark';