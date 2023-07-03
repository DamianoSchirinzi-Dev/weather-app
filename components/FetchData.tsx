"use client";
import { useState } from "react";
import type { WeatherData } from "@/types/types";
import Image from "next/image";

export default function FetchData() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [userQuery, setUserQuery] = useState<string>();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
  const axios = require("axios").default;

  const fetchData = async () => {
    try {
      const responseData = await axios.get(
        "https://weatherapi-com.p.rapidapi.com/current.json",
        {
          method: "GET",
          url: "https://weatherapi-com.p.rapidapi.com/current.json",
          params: { q: userQuery },
          headers: {
            "X-RapidAPI-Key":
              apiKey,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      
      const data = responseData.data as WeatherData;
      setWeatherData(data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserQuery(event.target.value);
  };

  return (
    <div className="flex flex-col items-center text-center my-28">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={fetchData}
        method="post"
      >
        <label htmlFor="city">Enter your city</label>
        <input
          className="px-4 py-1 my-6 border-2 border-slate-950"
          type="text"
          id="city"
          name="city"
          onChange={handleChange}
          required
        />

        <button
          className="px-4 py-2 bg-green-200 border-2 rounded-lg border-slate-950"
          type="submit"
        >
          Submit
        </button>
      </form>

      {weatherData != null ? (
        <div className="object-cover w-1/3 py-8 mx-40 my-8 bg-slate-300 rounded-xl">
          <Image
            className="absolute"
            src={`https://${weatherData?.current.condition.icon}`}
            alt="WeatherIcon"
            width={80}
            height={80}
          />
          <ul className="relative space-y-2">
            <li>Country: {weatherData?.location.country}</li>
            <li>Region: {weatherData?.location.region}</li>
            <li>City: {weatherData?.location.name}</li>
            <li>Local Time: {weatherData?.location.localtime}</li>
            <li>Temperature: {weatherData?.current.temp_f}°F</li>
            <li>Feels like: {weatherData?.current.feelslike_f} °F</li>
            <li>Condition: {weatherData?.current.condition.text}</li>
            <li>Cloudiness: {weatherData?.current.cloud}%</li>
            <li>Wind Direction: {weatherData?.current.wind_dir}</li>
            <li>Wind Speed: {weatherData?.current.wind_kph} kph</li>
          </ul>{" "}
        </div>
      ) : (
        <h1 className="py-6 mx-40 my-8 space-y-1 w-36 bg-slate-300 rounded-xl">
          Loading...
        </h1>
      )}
    </div>
  );
}
