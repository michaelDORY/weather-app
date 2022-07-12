import { configureStore } from '@reduxjs/toolkit'
import citiesReducer from './reducers/citiesSlice'
import { cityWeatherApi } from './services/weather'

export const store = configureStore({
  reducer: {
    citiesReducer,
    [cityWeatherApi.reducerPath]: cityWeatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cityWeatherApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
