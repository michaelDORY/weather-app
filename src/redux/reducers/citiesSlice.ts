import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addCityIdToLS, deleteCityIdFromLS } from '../../helpers/localStorage'
import { FetchedCityWeather } from '../../types'

export interface CityState extends FetchedCityWeather {}

interface ICitiesSliceState {
  cities: CityState[]
  selectedCity: null | CityState
}

const initialState: ICitiesSliceState = {
  cities: [],
  selectedCity: null,
}

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CityState>) => {
      addCityIdToLS(action.payload.id)
      const { cities } = state
      const suchCity = cities.find((item) => item.id === action.payload.id)
      !suchCity && cities.push(action.payload)
      return state
    },
    setCities: (state, action: PayloadAction<CityState[]>) => {
      state.cities = action.payload
      return state
    },
    deleteCity: (state, action: PayloadAction<number | string>) => {
      deleteCityIdFromLS(action.payload)
      state.cities = state.cities.filter((item) => item.id !== action.payload)
      return state
    },
    updateCity: (state, action: PayloadAction<CityState>) => {
      const { cities } = state
      const indexOfCity = cities.findIndex((item) => item.id === action.payload.id)
      if (indexOfCity !== -1) {
        state.cities[indexOfCity] = action.payload
        return state
      }
    },
    selectCity: (state, action: PayloadAction<number | string>) => {
      const { cities } = state
      const city = cities.find((item) => item.id === action.payload)
      if (city) state.selectedCity = city
    },
    unselectCity: (state) => {
      state.selectedCity = null
      return state
    },
  },
})

export const { addCity, setCities, deleteCity, updateCity, selectCity, unselectCity } =
  citiesSlice.actions

export default citiesSlice.reducer
