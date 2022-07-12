import { Button, Stack, TextField } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { addCity } from '../redux/reducers/citiesSlice'
import { useGetCityWeatherQuery } from '../redux/services/weather'

const AddCityForm: FC = () => {
  const [city, setCity] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const {
    error: weatherError,
    data: weatherData,
    isLoading: isLoadingWeather,
  } = useGetCityWeatherQuery(city ?? 'London')
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (weatherData) {
      dispatch(addCity(weatherData))
    }
  }, [weatherData])

  return (
    <>
      <Stack>
        <TextField value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => setCity(value)}>Add city</Button>
      </Stack>
      {isLoadingWeather && <h1>Loading...</h1>}
      {weatherError && <h1>error</h1>}
    </>
  )
}

export default AddCityForm
