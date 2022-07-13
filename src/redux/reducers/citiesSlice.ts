import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addCityIdToLS, deleteCityIdFromLS } from '../../helpers/localStorage'
import { FetchedCityWeather } from '../../types'

export interface CityState extends FetchedCityWeather {}

const initialState: CityState[] = []

export const citiesSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CityState>) => {
      addCityIdToLS(action.payload.id)
      const suchCity = state.find((item) => item.id === action.payload.id)
      return suchCity ? state : [...state, action.payload]
    },
    setCities: (state, action: PayloadAction<CityState[]>) => {
      return action.payload
    },
    deleteCity: (state, action: PayloadAction<number | string>) => {
      deleteCityIdFromLS(action.payload)
      return state.filter((item) => item.id !== action.payload)
    },
    updateCity: (state, action: PayloadAction<CityState>) => {
      const indexOfCity = state.findIndex((item) => item.id === action.payload.id)
      if (indexOfCity !== -1) {
        state[indexOfCity] = action.payload
        return state
      }
    },
  },
})

export const { addCity, setCities, deleteCity, updateCity } = citiesSlice.actions

export default citiesSlice.reducer
