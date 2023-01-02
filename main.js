/* eslint no-alert: 0 */
import './style.css';
import getWeatherData from './weather';
import { setValue, getIconUrl } from './helpers';

const currentIcon = document.querySelector('[data-current-icon]');

function renderCurrentWeather(current) {
    currentIcon.src = getIconUrl(current.iconCode);
    setValue('current-temp', current.currentTemp);
    setValue('current-high', current.highTemp);
    setValue('current-low', current.lowTemp);
    setValue('current-fl-high', current.highFeelsLike);
    setValue('current-fl-low', current.lowFeelsLike);
    setValue('current-wind', current.windSpeed);
    setValue('current-precip', current.precip);
}

const DAY_FORMATTER = new Intl.DateTimeFormat(undefined, { weekday: 'long' });
const dailySection = document.querySelector('[data-day-section]');
const dayCardTemplate = document.getElementById('day-card-template');

function renderDailyWeather(daily) {
    dailySection.innerHTML = '';
    daily.forEach((day) => {
        const element = dayCardTemplate.content.cloneNode(true);

        setValue('temp', day.maxTemp, { parent: element });
        setValue('date', DAY_FORMATTER.format(day.timestamp), {
            parent: element,
        });
        element.querySelector('[data-icon]').src = getIconUrl(day.iconCode);
        dailySection.append(element);
    });
}

const HOUR_FORMATTER = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    hourCycle: 'h12',
});
const hourlySection = document.querySelector('[data-hour-section]');
const hourRowTemplate = document.getElementById('hour-row-template');

function renderHourlyWeather(hourly) {
    hourlySection.innerHTML = '';
    hourly.forEach((hour) => {
        const element = hourRowTemplate.content.cloneNode(true);

        setValue('temp', hour.temp, { parent: element });
        setValue('fl-temp', hour.feelsLike, { parent: element });
        setValue('wind', hour.windSpeed, { parent: element });
        setValue('precip', hour.precip, { parent: element });
        setValue('day', DAY_FORMATTER.format(hour.timestamp), {
            parent: element,
        });
        setValue('time', HOUR_FORMATTER.format(hour.timestamp), {
            parent: element,
        });
        element.querySelector('[data-icon]').src = getIconUrl(hour.iconCode);
        hourlySection.append(element);
    });
}

function renderWeather({ current, daily, hourly }) {
    renderCurrentWeather(current);
    renderDailyWeather(daily);
    renderHourlyWeather(hourly);

    document.body.classList.remove('blurred');
}

function onSuccess({ coords }) {
    /* Intl.DateTimeFormat().resolvedOptions().timeZone returns a timezone (Asia/Calcutta)
computed during initialization of Intl.DateTimeFormat object */
    getWeatherData(
        coords.latitude,
        coords.longitude,
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )
        .then(renderWeather)
        .catch((err) => {
            console.error(err);
            alert('Unable to get weather forcast, try after some time.');
        });
}

function onError(err) {
    switch (err.code) {
        case err.PERMISSION_DENIED:
            alert('Please allow to use your location and refresh the page.');
            break;
        case err.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case err.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case err.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
        default:
            alert(
                'An error has been occurred while getting your location, please refresh the page.'
            );
    }
}

// HTML Geolocation API
navigator.geolocation.getCurrentPosition(onSuccess, onError);
