import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from './reducers/citiesSlice'
import { cityGeoApi } from './services/geo'
import { cityWeatherApi } from './services/weather'

export const store = configureStore({
  reducer: {
    citiesReducer,
    [cityWeatherApi.reducerPath]: cityWeatherApi.reducer,
    [cityGeoApi.reducerPath]: cityGeoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cityWeatherApi.middleware).concat(cityGeoApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
