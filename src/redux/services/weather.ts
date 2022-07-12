import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WEATHER_BASE_URL } from '../../constrains'
import type { CityWeatherParams, FetchedCityWeather } from '../../types'

export const cityWeatherApi = createApi({
  reducerPath: 'cityWeatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${WEATHER_BASE_URL}data/2.5/weather` }),
  endpoints: (builder) => ({
    getCityWeather: builder.query<FetchedCityWeather, CityWeatherParams>({
      query: (params) => {
        // if(params) {
        const { lat, lon } = params
        return `/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
        // }
        // return ''
      },
    }),
    getCitiesWeather: builder.query<FetchedCityWeather, (string | number)[]>({
      query: (arr) => `/group?id=${arr.toString()}&appid=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
})

export const { useGetCityWeatherQuery, useGetCitiesWeatherQuery } = cityWeatherApi
