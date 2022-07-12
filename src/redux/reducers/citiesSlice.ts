import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchedCityWeather } from '../../types'

export interface CityState extends FetchedCityWeather {}

const initialState: CityState[] = []

export const citiesSlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<CityState>) => {
      state.push(action.payload)
    },
    setCities: (state, action: PayloadAction<CityState[]>) => {
      state = action.payload
    },
  },
})

export const { addCity, setCities } = citiesSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default citiesSlice.reducer
