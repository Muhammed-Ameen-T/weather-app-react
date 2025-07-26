import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useTheme } from './hooks/useTheme';
import { fetchWeatherData } from './utils/api';
import { getWeatherBackground } from './utils/weatherBackground';
import type { TemperatureUnit, WeatherData } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>('celsius');
  const [backgroundImage, setBackgroundImage] = useState<string>('');
  const { theme, toggleTheme } = useTheme();

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeatherData(city);
      setWeather(weatherData);
      
      const bgImage = getWeatherBackground(weatherData);
      setBackgroundImage(bgImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleRetry = () => {
    if (weather) {
      handleSearch(weather.name);
    }
  };

  useEffect(() => {
    // Set default background
    setBackgroundImage('https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80');
  }, []);

  return (
    <div 
      className="min-h-screen transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        temperatureUnit={temperatureUnit}
        onTemperatureUnitToggle={toggleTemperatureUnit}
      />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Discover Weather
            </h2>
            <p className="text-xl text-gray-200 drop-shadow-md">
              Get real-time weather information for any city around the world
            </p>
          </div>

          <div className="mb-12">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>

          <div className="flex justify-center">
            {isLoading && <LoadingSpinner />}
            
            {error && !isLoading && (
              <div className="w-full max-w-md">
                <ErrorMessage message={error} onRetry={handleRetry} />
              </div>
            )}
            
            {weather && !isLoading && !error && (
              <div className="w-full max-w-2xl">
                <WeatherCard weather={weather} temperatureUnit={temperatureUnit} />
              </div>
            )}
            
            {!weather && !isLoading && !error && (
              <div className="backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border border-white/20 dark:border-gray-700/20 rounded-3xl p-12 text-center max-w-md">
                <div className="text-6xl mb-4">🌤️</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Welcome to Weather App
                </h3>
                <p className="text-gray-200">
                  Search for a city to get started with real-time weather information
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;