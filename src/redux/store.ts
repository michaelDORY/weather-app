import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit'
import citiesReducer from './reducers/citiesSlice'
import { cityWeatherApi } from './services/weather'

const rootReducer = combineReducers({
  citiesReducer,
  [cityWeatherApi.reducerPath]: cityWeatherApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cityWeatherApi.middleware),
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
