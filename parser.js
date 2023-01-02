function parseCurrentWeather({ current_weather, daily }) {
    const {
        temperature: currentTemp,
        windspeed: windSpeed,
        weathercode: iconCode,
    } = current_weather;

    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily;

    return {
        currentTemp: Math.round(currentTemp),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windSpeed: Math.round(windSpeed),
        precip: Math.round(precip),
        iconCode,
    };
}

function parseDailyWeather({ daily }) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000, // sec to ms
            iconCode: daily.weathercode[index],
            maxTemp: Math.round(daily.temperature_2m_max[index]),
        };
    });
}

function parseHourlyWeather({ hourly, current_weather }) {
    return hourly.time
        .map((time, index) => {
            return {
                timestamp: time * 1000, // sec to ms
                iconCode: hourly.weathercode[index],
                temp: Math.round(hourly.temperature_2m[index]),
                feelsLike: Math.round(hourly.apparent_temperature[index]),
                windSpeed: Math.round(hourly.windspeed_10m[index]),
                precip: Math.round(hourly.precipitation[index]),
            };
        })
        .filter(({ timestamp }) => timestamp >= current_weather.time * 1000); // sec to ms
}

export { parseCurrentWeather, parseDailyWeather, parseHourlyWeather };
