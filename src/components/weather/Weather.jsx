import { useState } from "react";
import { toast } from "react-toastify";
import { fetchWeather } from "../../services/weatherApi";

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
      toast.success("Weather updated");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid API key");
      } else if (err.response?.status === 400) {
        setError("City not found");
      } else {
        setError("Failed to fetch weather");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-3xl" />
      <div className="absolute top-0 left-10 h-40 w-40 bg-cyan-500/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 right-10 h-48 w-48 bg-purple-500/20 blur-3xl rounded-full -z-10" />

      {/* Header */}
      <div className="mb-6">
        <p className="text-cyan-300 text-xs uppercase tracking-[0.3em] font-semibold">
          Live Weather Intelligence
        </p>

        <h2 className="text-4xl font-black mt-3 leading-tight">
          Atmospheric Dashboard
        </h2>

        <p className="text-slate-300 mt-2">
          Real-time climate insights with premium visualization
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-2 shadow-xl">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold shadow-lg hover:scale-105 transition"
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl bg-red-500/20 border border-red-500/30 p-4">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-12 text-center text-cyan-300 animate-pulse text-lg">
          Loading weather...
        </div>
      )}

      {/* Empty */}
      {!weather && !loading && !error && (
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 text-center shadow-2xl">
          <div className="text-7xl mb-4">🌤️</div>
          <h3 className="text-2xl font-bold">Search Weather Anywhere</h3>
          <p className="text-slate-300 mt-2">
            Enter any city to unlock premium climate analytics
          </p>
        </div>
      )}

      {/* Weather Data */}
      {weather && !loading && (
        <div className="space-y-6">
          {/* Main Hero */}
          <div className="rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-400 text-sm uppercase tracking-wider">
                  Current Weather
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  {weather.location.name}
                </h3>

                <p className="text-slate-300">{weather.location.country}</p>
              </div>

              <img
                src={`https:${weather.current.condition.icon}`}
                alt=""
                className="w-20 h-20"
              />
            </div>

            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-6xl font-black">{weather.current.temp_c}°</p>

                <p className="text-cyan-300 mt-2">
                  {weather.current.condition.text}
                </p>
              </div>

              <div className="text-right">
                <p className="text-slate-400">Feels Like</p>
                <p className="text-2xl font-bold">
                  {weather.current.feelslike_c}°
                </p>
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            {[
              ["Humidity", `${weather.current.humidity}%`, "💧"],
              ["Wind", `${weather.current.wind_kph} kph`, "🌬️"],
              ["UV Index", weather.current.uv, "☀️"],
              ["Pressure", `${weather.current.pressure_mb} mb`, "🌡️"],
            ].map(([label, value, icon]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-5 shadow-lg hover:scale-105 transition"
              >
                <div className="text-3xl">{icon}</div>
                <p className="text-slate-400 mt-3">{label}</p>
                <p className="text-xl font-bold mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
