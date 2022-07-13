import { LoadingButton } from '@mui/lab'
import { Paper, Stack, TextField } from '@mui/material'
import React, { FC, FormEvent, useEffect, useState } from 'react'
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValue('')
    setCity(value)
  }

  return (
    <Paper sx={{ paddingY: 4 }} elevation={24}>
      <form onSubmit={handleSubmit}>
        <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
          <TextField
            value={value}
            label='City'
            helperText={weatherError && 'Incorrect name of city'}
            error={!!weatherError}
            sx={{ position: 'relative' }}
            onChange={(e) => setValue(e.target.value)}
          />
          <LoadingButton loading={isLoadingWeather} variant='contained' type='submit'>
            Add city
          </LoadingButton>
        </Stack>
      </form>
    </Paper>
  )
}

export default AddCityForm
