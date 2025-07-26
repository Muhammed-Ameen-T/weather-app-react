import React from 'react';
import { Cloud, Sun, Moon } from 'lucide-react';
import type { TemperatureUnit, Theme } from '../types/weather';

interface HeaderProps {
  theme: Theme;
  onThemeToggle: () => void;
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitToggle: () => void;
}

export function Header({ theme, onThemeToggle, temperatureUnit, onTemperatureUnitToggle }: HeaderProps) {
  return (
    <header className="backdrop-blur-md bg-white/10 dark:bg-gray-900/10 border-b border-white/20 dark:border-gray-700/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-blue-500/20 backdrop-blur-sm">
              <Cloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Weather App
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Real-time weather information
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onTemperatureUnitToggle}
              className="px-3 py-2 rounded-lg bg-white/20 dark:bg-gray-700/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-200 font-medium"
            >
              {temperatureUnit === 'celsius' ? '°C' : '°F'}
            </button>
            
            {/* <button
              onClick={onThemeToggle}
              className="p-2 rounded-lg bg-white/20 dark:bg-gray-700/20 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-600/30 transition-all duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button> */}
          </div>
        </div>
      </div>
    </header>
  );
}