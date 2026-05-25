import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { fetchWeather } from "../../services/weatherApi";
import Button from "../common/Button";
import Loader from "../common/Loader";

function getAQIInfo(index) {
  if (!index)
    return {
      label: "Unavailable",
      color: "text-zinc-300",
      bg: "bg-zinc-500/10",
    };

  if (index <= 50)
    return {
      label: "Excellent",
      color: "text-emerald-300",
      bg: "bg-emerald-500/10",
    };

  if (index <= 100)
    return {
      label: "Moderate",
      color: "text-amber-300",
      bg: "bg-amber-500/10",
    };

  if (index <= 150)
    return {
      label: "Sensitive",
      color: "text-orange-300",
      bg: "bg-orange-500/10",
    };

  return {
    label: "Poor",
    color: "text-rose-300",
    bg: "bg-rose-500/10",
  };
}

function getComfortScore(temp, humidity) {
  let score = 100;

  if (temp > 35) score -= 30;
  else if (temp > 30) score -= 15;

  if (humidity > 80) score -= 20;
  else if (humidity > 65) score -= 10;

  if (temp < 10) score -= 20;

  return Math.max(score, 0);
}

function getActivityAdvice(weather) {
  const temp = weather.current.temp_c;
  const rain = weather.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain;

  if (rain > 60) return "Rain likely — indoor plans recommended ☔";
  if (temp > 35) return "Extreme heat — avoid prolonged outdoor exposure 🔥";
  if (temp >= 20 && temp <= 30)
    return "Excellent conditions for outdoor activities 🌿";

  return "Moderate weather conditions today 🌤️";
}

function getDayStatus(weather) {
  return weather.current.is_day ? "Day Mode ☀️" : "Night Mode 🌙";
}

function getMood(weather) {
  const condition = weather.current.condition.text.toLowerCase();

  if (condition.includes("rain")) return "Rainy mood";
  if (condition.includes("cloud")) return "Cloudy atmosphere";
  if (condition.includes("sun")) return "Bright energetic weather";

  return "Dynamic atmospheric conditions";
}

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  async function handleSearch(searchCity = city) {
    if (!searchCity.trim()) {
      setError("Enter a city name");
      toast.warning("Please enter a city");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await fetchWeather(searchCity.trim());

      setWeather(data);

      setSearchHistory((prev) => {
        const updated = [
          searchCity.trim(),
          ...prev.filter(
            (item) =>
              item.toLowerCase() !== searchCity.trim().toLowerCase()
          ),
        ];

        return updated.slice(0, 6);
      });

      toast.success("Atmospheric intelligence updated");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid weather API key");
      } else if (err.response?.status === 400) {
        setError("City not found");
      } else {
        setError("Weather intelligence unavailable");
      }

      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setCity("");
    setWeather(null);
    setError("");
  }

  const comfortScore = weather
    ? getComfortScore(
        weather.current.temp_c,
        weather.current.humidity
      )
    : 0;

  const aqiValue =
    weather?.current?.air_quality?.["us-epa-index"] || null;

  const aqiInfo = getAQIInfo(aqiValue);

  const metrics = weather
    ? [
        {
          label: "Humidity",
          value: `${weather.current.humidity}%`,
          icon: "💧",
          accent:
            "border-emerald-400/20 text-emerald-300",
        },
        {
          label: "Wind Speed",
          value: `${weather.current.wind_kph} kph`,
          icon: "🌬️",
          accent:
            "border-amber-400/20 text-amber-300",
        },
        {
          label: "Visibility",
          value: `${weather.current.vis_km} km`,
          icon: "👁️",
          accent:
            "border-rose-400/20 text-rose-300",
        },
        {
          label: "Pressure",
          value: `${weather.current.pressure_mb} mb`,
          icon: "🌡️",
          accent:
            "border-orange-400/20 text-orange-300",
        },
        {
          label: "UV Index",
          value: weather.current.uv,
          icon: "☀️",
          accent:
            "border-yellow-400/20 text-yellow-300",
        },
        {
          label: "Cloud Cover",
          value: `${weather.current.cloud}%`,
          icon: "☁️",
          accent:
            "border-cyan-300/20 text-cyan-200",
        },
        {
          label: "Wind Direction",
          value: weather.current.wind_dir,
          icon: "🧭",
          accent:
            "border-fuchsia-400/20 text-fuchsia-300",
        },
        {
          label: "Gust Speed",
          value: `${weather.current.gust_kph} kph`,
          icon: "💨",
          accent:
            "border-pink-400/20 text-pink-300",
        },
      ]
    : [];

  const hourlyForecast = useMemo(() => {
    if (!weather?.forecast?.forecastday?.[0]?.hour) return [];

    return weather.forecast.forecastday[0].hour
      .filter((_, index) => index % 3 === 0)
      .slice(0, 8);
  }, [weather]);

  const forecastDays = weather?.forecast?.forecastday || [];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 shadow-2xl backdrop-blur-2xl text-white">

      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"></div>

      <div className="relative z-10 space-y-6">
                {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-zinc-400">
            Premium Weather Intelligence
          </p>

          <h2 className="mt-3 text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
            Atmospheric Command Center
          </h2>

          <p className="mt-3 text-zinc-300 max-w-2xl leading-relaxed">
            Advanced weather forecasting, climate analytics, comfort intelligence,
            and premium atmospheric insights.
          </p>
        </div>

        {/* Search */}
        <div className="rounded-3xl border border-white/10 bg-white/10 p-4 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-3">
            <input
              type="text"
              placeholder="Search any city worldwide..."
              value={city}
              disabled={loading}
              onChange={(e) => {
                setCity(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSearch()
              }
              className="
                flex-1
                rounded-2xl
                border
                border-white/10
                bg-black/20
                px-5
                py-4
                text-white
                placeholder:text-zinc-500
                outline-none
                transition-all
                focus:border-amber-400/40
                focus:ring-2
                focus:ring-amber-400/20
              "
            />

            <Button
              onClick={() => handleSearch()}
              disabled={loading}
              className="
                rounded-2xl
                px-8
                bg-gradient-to-r
                from-amber-500
                via-orange-500
                to-rose-500
                font-bold
                shadow-xl
              "
            >
              {loading ? "Scanning..." : "Search"}
            </Button>

            <Button
              onClick={clearSearch}
              className="
                rounded-2xl
                px-6
                bg-white/10
                hover:bg-white/20
                border border-white/10
              "
            >
              Clear
            </Button>
          </div>
        </div>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {searchHistory.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCity(item);
                  handleSearch(item);
                }}
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                  text-zinc-200
                  hover:bg-white/20
                  transition-all
                  hover:scale-105
                "
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-5 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="font-semibold text-rose-200">
                {error}
              </p>

              <Button
                onClick={() => handleSearch()}
                className="
                  rounded-xl
                  px-5
                  bg-rose-500/20
                  border border-rose-300/20
                "
              >
                Retry
              </Button>
            </div>
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
          <div className="rounded-3xl border border-white/10 bg-white/10 p-14 text-center backdrop-blur-2xl shadow-2xl">
            <div className="mb-6 text-8xl animate-pulse">
              🌍
            </div>

            <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white via-amber-200 to-rose-300 bg-clip-text text-transparent">
              Explore Global Weather
            </h3>

            <p className="mt-4 text-zinc-300 text-lg max-w-xl mx-auto">
              Search any city worldwide to unlock premium weather intelligence,
              forecasts, air quality insights, and atmospheric analytics.
            </p>
          </div>
        )}

        {/* Main Weather */}
        {weather && !loading && (
          <div className="space-y-8">

            {/* Hero */}
            <div className="grid lg:grid-cols-3 gap-6">

              {/* Main Weather Card */}
              <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-2xl shadow-2xl">

                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                      Current Conditions
                    </p>

                    <h3 className="mt-3 text-4xl md:text-5xl font-black">
                      {weather.location.name}
                    </h3>

                    <p className="mt-2 text-zinc-300">
                      {weather.location.region}, {weather.location.country}
                    </p>

                    <div className="mt-8">
                      <p className="text-7xl md:text-8xl font-black text-amber-300">
                        {weather.current.temp_c}°
                      </p>

                      <p className="mt-3 text-emerald-300 text-xl font-semibold">
                        {weather.current.condition.text}
                      </p>

                      <p className="mt-3 text-zinc-300">
                        {getActivityAdvice(weather)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <img
                      src={`https:${weather.current.condition.icon}`}
                      alt={weather.current.condition.text}
                      className="w-32 h-32"
                    />

                    <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-6 py-4">
                      <p className="text-sm text-amber-200">
                        Feels Like
                      </p>

                      <p className="text-3xl font-bold">
                        {weather.current.feelslike_c}°
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Smart Insights */}
              <div className="space-y-4">
                <div className={`rounded-3xl border border-white/10 p-5 backdrop-blur-xl ${aqiInfo.bg}`}>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">
                    Air Quality
                  </p>

                  <p className={`mt-3 text-2xl font-black ${aqiInfo.color}`}>
                    {aqiInfo.label}
                  </p>

                  <p className="mt-2 text-zinc-300">
                    EPA Index: {aqiValue || "N/A"}
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">
                    Comfort Score
                  </p>

                  <p className="mt-3 text-3xl font-black text-emerald-300">
                    {comfortScore}%
                  </p>

                  <div className="mt-4 h-3 rounded-full bg-black/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
                      style={{ width: `${comfortScore}%` }}
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">
                    Atmospheric Mode
                  </p>

                  <p className="mt-3 text-xl font-bold text-rose-300">
                    {getDayStatus(weather)}
                  </p>

                  <p className="mt-2 text-zinc-300">
                    {getMood(weather)}
                  </p>
                </div>
              </div>
            </div>
                        {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className={`
                    rounded-3xl
                    border
                    ${metric.accent}
                    bg-white/10
                    backdrop-blur-2xl
                    p-5
                    shadow-xl
                    hover:scale-[1.03]
                    transition-all
                    duration-300
                  `}
                >
                  <div className="text-4xl">{metric.icon}</div>

                  <p className="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-400">
                    {metric.label}
                  </p>

                  <p className="mt-3 text-2xl font-black text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Local Insights */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Local Time
                </p>

                <p className="mt-4 text-2xl font-black">
                  {weather.location.localtime}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Sunrise
                </p>

                <p className="mt-4 text-2xl font-black text-amber-300">
                  {forecastDays?.[0]?.astro?.sunrise || "N/A"}
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">
                  Sunset
                </p>

                <p className="mt-4 text-2xl font-black text-rose-300">
                  {forecastDays?.[0]?.astro?.sunset || "N/A"}
                </p>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-2xl font-black">
                  Hourly Forecast
                </h4>

                <span className="text-zinc-400 text-sm">
                  3-hour intervals
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {hourlyForecast.map((hour, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/20 p-4 text-center hover:bg-white/10 transition"
                  >
                    <p className="text-sm text-zinc-400">
                      {hour.time.split(" ")[1]}
                    </p>

                    <img
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                      className="mx-auto w-12 h-12"
                    />

                    <p className="text-xl font-black text-amber-300">
                      {hour.temp_c}°
                    </p>

                    <p className="text-xs text-zinc-400 mt-2">
                      {hour.chance_of_rain}% rain
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-Day Forecast */}
            <div>
              <h4 className="text-2xl font-black mb-6">
                3-Day Forecast
              </h4>

              <div className="grid md:grid-cols-3 gap-6">
                {forecastDays.map((day, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-2xl shadow-xl hover:scale-[1.02] transition"
                  >
                    <p className="text-zinc-400 text-sm">
                      {day.date}
                    </p>

                    <img
                      src={`https:${day.day.condition.icon}`}
                      alt={day.day.condition.text}
                      className="w-16 h-16 mt-4"
                    />

                    <h5 className="mt-4 text-xl font-black">
                      {day.day.condition.text}
                    </h5>

                    <div className="mt-5 flex justify-between">
                      <div>
                        <p className="text-zinc-400 text-xs">
                          Max
                        </p>

                        <p className="text-amber-300 font-bold text-xl">
                          {day.day.maxtemp_c}°
                        </p>
                      </div>

                      <div>
                        <p className="text-zinc-400 text-xs">
                          Min
                        </p>

                        <p className="text-cyan-200 font-bold text-xl">
                          {day.day.mintemp_c}°
                        </p>
                      </div>

                      <div>
                        <p className="text-zinc-400 text-xs">
                          Rain
                        </p>

                        <p className="text-emerald-300 font-bold text-xl">
                          {day.day.daily_chance_of_rain}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}