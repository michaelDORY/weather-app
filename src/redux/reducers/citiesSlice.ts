import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addCityNameToLS, deleteCityNameFromLS } from '../../helpers/localStorage'
import { FetchedCityWeather } from '../../types'

export interface CityState extends FetchedCityWeather {}

interface ICitiesSliceState {
  shouldBeAdded: null | string
  cities: string[]
  selectedCity: null | CityState
}

const initialState: ICitiesSliceState = {
  shouldBeAdded: null,
  cities: [],
  selectedCity: null,
}

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setShouldBeAdded: (state, action: PayloadAction<string>) => {
      state.shouldBeAdded = action.payload
      return state
    },
    clearShouldBeAdded: (state) => {
      state.shouldBeAdded = null
      return state
    },
    addCity: (state, action: PayloadAction<string>) => {
      const { cities } = state
      const isSuchCity = cities.includes(action.payload)
      if (!isSuchCity) {
        addCityNameToLS(action.payload)
        cities.push(action.payload)
        return state
      }
    },
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload
      return state
    },
    deleteCity: (state, action: PayloadAction<string>) => {
      deleteCityNameFromLS(action.payload)
      state.cities = state.cities.filter((name) => name !== action.payload)
      return state
    },
    selectCity: (state, action: PayloadAction<CityState>) => {
      const { cities } = state
      const isSuchCity = cities.includes(action.payload.name)
      if (isSuchCity) {
        state.selectedCity = action.payload
        return state
      }
    },
    unselectCity: (state) => {
      state.selectedCity = null
      return state
    },
  },
})

export const {
  clearShouldBeAdded,
  setShouldBeAdded,
  addCity,
  setCities,
  deleteCity,
  selectCity,
  unselectCity,
} = citiesSlice.actions

export default citiesSlice.reducer
