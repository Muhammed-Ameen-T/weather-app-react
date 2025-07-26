import type { TemperatureUnit } from "../types/weather";

export function convertTemperature(temp: number, unit: TemperatureUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((temp * 9/5) + 32);
  }
  return Math.round(temp);
}

export function getTemperatureSymbol(unit: TemperatureUnit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}