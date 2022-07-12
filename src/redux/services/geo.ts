import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { WEATHER_BASE_URL } from '../../constrains'
import type { FetchedCityGeo } from '../../types'

export const cityGeoApi = createApi({
  reducerPath: 'cityGeoApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${WEATHER_BASE_URL}geo/1.0/direct` }),
  endpoints: (builder) => ({
    getCityGeo: builder.query<FetchedCityGeo, string>({
      query: (cityName) => `?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
})

export const { useGetCityGeoQuery } = cityGeoApi
