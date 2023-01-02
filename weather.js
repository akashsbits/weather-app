import axios from 'axios';
import {
    parseCurrentWeather,
    parseDailyWeather,
    parseHourlyWeather,
} from './parser';

export function getWeatherData(latitude, longitude, timezone) {
    return axios
        .get(
            'https://api.open-meteo.com/v1/forecast?&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timeformat=unixtime',
            {
                params: {
                    latitude,
                    longitude,
                    timezone,
                },
            }
        )
        .then(({ data }) => {
            return {
                current: parseCurrentWeather(data),
                daily: parseDailyWeather(data),
                hourly: parseHourlyWeather(data),
            };
        });
}
