'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, CloudFog, CloudDrizzle, CloudSun } from 'lucide-react'

interface WeatherData {
    temp: number
    condition: string
    windSpeed: number
    windDirection: string
    code: number
    isDay: boolean
    isCloudy: boolean
}

const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return directions[Math.round(deg / 45) % 8]
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await fetch(
                    'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current=temperature_2m,is_day,weather_code,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph'
                )
                const data = await res.json()
                const current = data.current

                // Map WMO codes to conditions and icons
                // https://open-meteo.com/en/docs
                const codes: Record<number, { label: string; cloudy: boolean }> = {
                    0: { label: 'CLEAR SKY', cloudy: false },
                    1: { label: 'MAINLY CLEAR', cloudy: false },
                    2: { label: 'PARTLY CLOUDY', cloudy: true },
                    3: { label: 'OVERCAST', cloudy: true },
                    45: { label: 'FOGGY', cloudy: true },
                    48: { label: 'FOGGY', cloudy: true },
                    51: { label: 'LIGHT DRIZZLE', cloudy: true },
                    53: { label: 'DRIZZLE', cloudy: true },
                    55: { label: 'HEAVY DRIZZLE', cloudy: true },
                    61: { label: 'LIGHT RAIN', cloudy: true },
                    63: { label: 'RAIN', cloudy: true },
                    65: { label: 'HEAVY RAIN', cloudy: true },
                    71: { label: 'LIGHT SNOW', cloudy: true },
                    73: { label: 'SNOW', cloudy: true },
                    75: { label: 'HEAVY SNOW', cloudy: true },
                    95: { label: 'THUNDERSTORM', cloudy: true },
                }

                const conditionInfo = codes[current.weather_code] || { label: 'STABLE', cloudy: false }

                setWeather({
                    temp: Math.round(current.temperature_2m),
                    condition: conditionInfo.label,
                    windSpeed: Math.round(current.wind_speed_10m),
                    windDirection: getWindDirection(current.wind_direction_10m),
                    code: current.weather_code,
                    isDay: current.is_day === 1,
                    isCloudy: conditionInfo.cloudy
                })

                // Trigger pulse
                setRefreshKey(prev => prev + 1)
            } catch (error) {
                console.error('Failed to fetch weather:', error)
            }
        }

        fetchWeather()
        const interval = setInterval(fetchWeather, 30 * 60 * 1000) // 30 minutes
        return () => clearInterval(interval)
    }, [])


    const getWeatherIcon = () => {
        if (!weather) return <Sun size={20} />
        const code = weather.code
        if (code === 0) return <Sun size={20} className="text-silver" />
        if (code <= 3) return <CloudSun size={20} className="text-silver" />
        if (code === 45 || code === 48) return <CloudFog size={20} className="text-silver" />
        if (code <= 55) return <CloudDrizzle size={20} className="text-silver" />
        if (code <= 65) return <CloudRain size={20} className="text-silver" />
        if (code <= 75) return <CloudSnow size={20} className="text-silver" />
        if (code >= 95) return <CloudLightning size={20} className="text-silver" />
        return <Cloud size={20} className="text-silver" />
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`glass px-6 py-4 rounded-xl flex flex-col border border-white/10 bg-white/5 backdrop-blur-md relative overflow-hidden transition-all duration-500 ${weather?.isCloudy ? 'after:content-[""] after:absolute after:inset-0 after:bg-[url("https://grainy-gradients.vercel.app/noise.svg")] after:opacity-[0.03] after:pointer-events-none' : ''}`}
        >
            <div className="flex justify-between items-start mb-4">
                {getWeatherIcon()}

                {/* Pulsing Dot */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={refreshKey}
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                        />
                    </AnimatePresence>
                </div>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-thin text-white tracking-tighter">
                    {weather ? `${weather.temp}°F` : "--°F"}
                </span>
            </div>

            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-silver font-medium tracking-[0.2em] uppercase">
                    {weather?.condition || "LOADING..."}
                </span>
                <div className="flex items-center gap-2 text-silver">
                    <Wind size={10} className="opacity-50" />
                    <span className="text-[10px] tracking-widest uppercase">
                        {weather ? `${weather.windDirection} ${weather.windSpeed} MPH` : "STABLE"}
                    </span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] font-mono text-white/20 tracking-tighter uppercase">
                    40.7128° N, 74.0060° W
                </span>
                <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">
                    Live Terminal
                </span>
            </div>
        </motion.div>
    )
}
