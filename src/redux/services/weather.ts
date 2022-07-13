import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WEATHER_BASE_URL } from '../../constrains'
import type { FetchedCityWeather } from '../../types'

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
      query: (arr) => `group?id=${arr.toString()}&appid=${process.env.REACT_APP_API_KEY}`,
      providesTags: ['FetchedCityWeather'],
    }),
  }),
})

export const { useGetCityWeatherQuery, useGetCitiesWeatherQuery } = cityWeatherApi
