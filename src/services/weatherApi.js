import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function fetchWeather(city) {
    if (!API_KEY) {
        throw new Error("Missing API key");
    }

    const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
            params: {
                key: API_KEY,
                q: city,
                aqi: "no",
            },
        }
    );

    return response.data;
}