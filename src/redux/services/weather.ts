import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WEATHER_BASE_URL } from '../../constrains'
import type { FetchedCityWeather, FetchedHourlyForecast, HourlyForecast } from '../../types'

export const cityWeatherApi = createApi({
  reducerPath: 'cityWeatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${WEATHER_BASE_URL}data/2.5/` }),
  tagTypes: ['FetchedCityWeather'],
  endpoints: (builder) => ({
    getCityWeather: builder.query<FetchedCityWeather, string>({
      query: (cityName) => {
        return `weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      },
    }),
    getCitiesWeather: builder.query<{ list: FetchedCityWeather[] }, (string | number)[]>({
      query: (arr) =>
        `group?id=${arr.toString()}&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
      providesTags: ['FetchedCityWeather'],
    }),
    getHourlyForecast: builder.query<HourlyForecast, string>({
      transformResponse: (res: FetchedHourlyForecast) => {
        return res.list
          .map((item) => ({
            temp: Math.round(item.main.temp),
            hours: item.dt_txt.slice(item.dt_txt.length - 8, item.dt_txt.length - 3),
          }))
          .sort((a, b) => Number.parseInt(a.hours) - Number.parseInt(b.hours))
      },
      query: (cityName) =>
        `forecast?q=${cityName}&cnt=8&units=metric&appid=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
})

export const { useGetCityWeatherQuery, useGetCitiesWeatherQuery, useGetHourlyForecastQuery } =
  cityWeatherApi
