import { Thermometer, Droplets, Wind, Gauge } from 'lucide-react';
import { convertTemperature, getTemperatureSymbol } from '../utils/temperature';
import type { TemperatureUnit, WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  temperatureUnit: TemperatureUnit;
}

export function WeatherCard({ weather, temperatureUnit }: WeatherCardProps) {
  const temperature = convertTemperature(weather.main.temp, temperatureUnit);
  const feelsLike = convertTemperature(weather.main.feels_like, temperatureUnit);
  const tempSymbol = getTemperatureSymbol(temperatureUnit);

  const weatherStats = [
    {
      icon: Thermometer,
      label: 'Feels like',
      value: `${feelsLike}${tempSymbol}`,
      color: 'text-orange-500'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      color: 'text-blue-500'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${weather.wind.speed} m/s`,
      color: 'text-emerald-500'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-32 h-32 drop-shadow-lg"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {weather.name}, {weather.sys.country}
        </h2>
        
        <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text mb-2">
          {temperature}{tempSymbol}
        </div>
        
        <p className="text-xl text-gray-700 dark:text-gray-300 capitalize mb-6 font-medium">
          {weather.weather[0].description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {weatherStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="backdrop-blur-sm bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-700/20 rounded-2xl p-4 hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl bg-white/20 dark:bg-gray-700/20 ${stat.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}