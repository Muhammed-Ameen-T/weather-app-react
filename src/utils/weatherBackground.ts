import type { WeatherData } from "../types/weather";

interface WeatherBackgrounds {
  [key: string]: {
    [subKey: string]: string;
  };
}

export const weatherBackgrounds: WeatherBackgrounds = {
  'clear-day': {
    morning: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1920&q=80',
    afternoon: 'https://images.unsplash.com/photo-1553901753-215db344677a?auto=format&fit=crop&w=1920&q=80',
    evening: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=1920&q=80'
  },
  'clear-night': {
    all: 'https://images.unsplash.com/photo-1532978879514-6cb2cac0c20d?auto=format&fit=crop&w=1920&q=80'
  },
  'clouds': {
    light: 'https://images.unsplash.com/photo-1525490829609-d166ddb58678?auto=format&fit=crop&w=1920&q=80',
    moderate: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1920&q=80',
    heavy: 'https://images.unsplash.com/photo-1483977399921-6cf94f6fdc3a?auto=format&fit=crop&w=1920&q=80'
  },
  'rain': {
    light: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80',
    moderate: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1920&q=80',
    heavy: 'https://images.unsplash.com/photo-1620385019253-b051a26048ce?auto=format&fit=crop&w=1920&q=80'
  },
  'thunderstorm': {
    all: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80'
  },
  'snow': {
    light: 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80',
    moderate: 'https://images.unsplash.com/photo-1550591074-4f9f752f7a64?auto=format&fit=crop&w=1920&q=80',
    heavy: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=1920&q=80'
  },
  'mist': {
    all: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?auto=format&fit=crop&w=1920&q=80'
  },
  'dust': {
    all: 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=1920&q=80'
  },
  'default': {
    all: 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80'
  }
};

export function getWeatherBackground(weatherData: WeatherData): string {
  const hours = new Date().getHours();
  const weatherMain = weatherData.weather[0].main.toLowerCase();
  const cloudiness = weatherData.clouds?.all || 0;
  const rainVolume = weatherData.rain?.['1h'] || 0;
  const snowVolume = weatherData.snow?.['1h'] || 0;

  let backgroundUrl: string;

  if (weatherMain === 'clear') {
    if (hours >= 6 && hours < 20) {
      if (hours < 10) backgroundUrl = weatherBackgrounds['clear-day'].morning;
      else if (hours < 16) backgroundUrl = weatherBackgrounds['clear-day'].afternoon;
      else backgroundUrl = weatherBackgrounds['clear-day'].evening;
    } else {
      backgroundUrl = weatherBackgrounds['clear-night'].all;
    }
  } else if (weatherMain === 'clouds') {
    if (cloudiness < 30) backgroundUrl = weatherBackgrounds.clouds.light;
    else if (cloudiness < 70) backgroundUrl = weatherBackgrounds.clouds.moderate;
    else backgroundUrl = weatherBackgrounds.clouds.heavy;
  } else if (weatherMain === 'rain') {
    if (rainVolume < 2.5) backgroundUrl = weatherBackgrounds.rain.light;
    else if (rainVolume < 7.6) backgroundUrl = weatherBackgrounds.rain.moderate;
    else backgroundUrl = weatherBackgrounds.rain.heavy;
  } else if (weatherMain === 'snow') {
    if (snowVolume < 1) backgroundUrl = weatherBackgrounds.snow.light;
    else if (snowVolume < 4) backgroundUrl = weatherBackgrounds.snow.moderate;
    else backgroundUrl = weatherBackgrounds.snow.heavy;
  } else if (weatherMain === 'thunderstorm') {
    backgroundUrl = weatherBackgrounds.thunderstorm.all;
  } else if (weatherMain === 'mist' || (weatherData.weather[0].id >= 701 && weatherData.weather[0].id <= 721)) {
    backgroundUrl = weatherBackgrounds.mist.all;
  } else if (weatherMain === 'dust' || (weatherData.weather[0].id >= 731 && weatherData.weather[0].id <= 751)) {
    backgroundUrl = weatherBackgrounds.dust.all;
  } else {
    backgroundUrl = weatherBackgrounds.default.all;
  }

  return backgroundUrl;
}