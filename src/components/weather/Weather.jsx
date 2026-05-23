import { useState } from "react";
import Card from "../common/Card";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { fetchWeather } from "../../services/weatherApi";

export default function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {
        if (!city.trim()) {
            setError("Please enter a city name");
            setWeather(null);
            return;
        }

        try {
            setLoading(true);
            setError("");
            setWeather(null);

            const data = await fetchWeather(city);
            setWeather(data);
        } catch (err) {
            console.log(err.response?.data || err.message);

            if (err.response?.status === 401) {
                setError("Invalid API key");
            } else if (err.response?.status === 400) {
                setError("City not found");
            } else if (err.message === "Missing API key") {
                setError("Weather API key missing");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <h2 className="text-xl font-bold mb-4">Weather App</h2>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Enter city (e.g. New Delhi)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 p-3 rounded bg-gray-100 text-black outline-none"
                />

                <Button
                    onClick={handleSearch}
                    className="bg-blue-500 hover:bg-blue-600"
                >
                    Search
                </Button>
            </div>

            {loading && <Loader />}

            {error && (
                <p className="text-red-500 font-medium">{error}</p>
            )}

            {weather && (
            <div className="space-y-2 text-gray-800">
                <p>
                    <strong>City:</strong> {weather.location.name}, {weather.location.country}
                </p>

                <p>
                    <strong>Temperature:</strong> {weather.current.temp_c}°C
                </p>

                <p>
                    <strong>Condition:</strong> {weather.current.condition.text}
                </p>

                <p>
                    <strong>Humidity:</strong> {weather.current.humidity}%
                </p>

                <p>
                    <strong>Wind Speed:</strong> {weather.current.wind_kph} kph
                </p>
            </div>
        )}
    </Card>
    );
}