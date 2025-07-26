import type { CityItem, WeatherData } from "../types/weather";

const API_KEY = '6573375bdd6db5cced6d3dea724d553d';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export async function fetchWeatherData(city: string): Promise<WeatherData> {
  const response = await fetch(
    `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  return response.json();
}

export async function fetchCitySuggestions(query: string): Promise<CityItem[]> {
  if (query.length < 3) return [];

  const response = await fetch(
    `${GEO_API_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch suggestions');
  }

  const cities = await response.json();
  return cities.map((city: { name: string; country: string; state: string }) => ({
    name: city.name,
    country: city.country,
    state: city.state
  }));
}