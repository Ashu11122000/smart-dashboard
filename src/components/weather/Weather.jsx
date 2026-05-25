import { useState } from "react";
import { toast } from "react-toastify";
import { fetchWeather } from "../../services/weatherApi";
import Button from "../common/Button";
import Loader from "../common/Loader";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!city.trim()) {
      setError("Enter a city name");
      toast.warning("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await fetchWeather(city.trim());

      setWeather(data);
      toast.success("Weather intelligence updated");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid weather API key");
      } else if (err.response?.status === 400) {
        setError("City not found");
      } else {
        setError("Failed to fetch weather");
      }
    } finally {
      setLoading(false);
    }
  }

  const metrics = weather
    ? [
        {
          label: "Humidity",
          value: `${weather.current.humidity}%`,
          icon: "💧",
          accent: "blue",
        },
        {
          label: "Wind",
          value: `${weather.current.wind_kph} kph`,
          icon: "🌬️",
          accent: "amber",
        },
        {
          label: "UV Index",
          value: weather.current.uv,
          icon: "☀️",
          accent: "violet",
        },
        {
          label: "Pressure",
          value: `${weather.current.pressure_mb} mb`,
          icon: "🌡️",
          accent: "emerald",
        },
      ]
    : [];

  const accentStyles = {
    blue: "text-blue-400 border-blue-400/10",
    amber: "text-amber-400 border-amber-400/10",
    violet: "text-violet-400 border-violet-400/10",
    emerald: "text-emerald-400 border-emerald-400/10",
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6 shadow-2xl backdrop-blur-2xl text-white">

      {/* Ambient Glow */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-6">

        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-blue-100/50">
            Live Weather Intelligence
          </p>

          <h2 className="text-4xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent mt-3">
            Atmospheric Dashboard
          </h2>

          <p className="text-blue-100/60 mt-2">
            Real-time climate intelligence with premium visualization
          </p>
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-blue-400/10 bg-white/5 backdrop-blur-xl p-3 shadow-xl">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Search any city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="
                flex-1
                rounded-2xl
                border border-blue-400/10
                bg-black/10
                px-5
                py-4
                text-white
                placeholder:text-blue-100/35
                outline-none
                transition-all
                focus:border-amber-400/30
                focus:ring-2
                focus:ring-amber-400/20
              "
            />

            <Button
              onClick={handleSearch}
              className="
                rounded-2xl
                px-8
                bg-gradient-to-r
                from-blue-600
                via-violet-600
                to-amber-500
                font-bold
              "
            >
              Search
            </Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-5 backdrop-blur-xl">
            <p className="font-semibold text-rose-300">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <Loader
            text="Fetching atmospheric intelligence..."
            variant="primary"
          />
        )}

        {/* Empty State */}
        {!weather && !loading && !error && (
          <div className="rounded-3xl border border-blue-400/10 bg-white/5 backdrop-blur-xl p-12 text-center shadow-2xl">
            <div className="text-7xl mb-5 animate-pulse">
              🌤️
            </div>

            <h3 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-amber-300 bg-clip-text text-transparent">
              Search Weather Anywhere
            </h3>

            <p className="text-blue-100/50 mt-3 text-lg">
              Enter any city to unlock premium climate analytics
            </p>
          </div>
        )}

        {/* Weather Data */}
        {weather && !loading && (
          <div className="space-y-6">

            {/* Hero Card */}
            <div className="rounded-3xl border border-blue-400/10 bg-white/5 backdrop-blur-2xl p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-100/40">
                    Current Weather
                  </p>

                  <h3 className="text-4xl font-black mt-3">
                    {weather.location.name}
                  </h3>

                  <p className="text-blue-100/60 mt-2">
                    {weather.location.country}
                  </p>

                  <div className="mt-8">
                    <p className="text-7xl font-black text-amber-400">
                      {weather.current.temp_c}°
                    </p>

                    <p className="text-blue-300 mt-3 text-lg">
                      {weather.current.condition.text}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <img
                    src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text}
                    className="w-28 h-28"
                  />

                  <div className="mt-4 rounded-2xl border border-violet-400/10 bg-violet-500/10 px-5 py-3">
                    <p className="text-sm text-violet-200">
                      Feels Like
                    </p>

                    <p className="text-2xl font-bold text-white">
                      {weather.current.feelslike_c}°
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`
                    rounded-3xl
                    border
                    bg-white/5
                    backdrop-blur-xl
                    p-5
                    shadow-xl
                    hover:scale-[1.03]
                    transition-all
                    duration-300
                    ${accentStyles[metric.accent]}
                  `}
                >
                  <div className="text-3xl">{metric.icon}</div>

                  <p className="text-blue-100/40 mt-4 uppercase text-xs tracking-[0.2em]">
                    {metric.label}
                  </p>

                  <p className="text-2xl font-black mt-2">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}