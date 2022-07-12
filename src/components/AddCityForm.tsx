import { Button, Stack, TextField } from '@mui/material'
import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { addCity } from '../redux/reducers/citiesSlice'
import { useGetCityGeoQuery } from '../redux/services/geo'
import { useGetCityWeatherQuery } from '../redux/services/weather'

const AddCityForm: FC = () => {
  const [city, setCity] = useState<string | null>(null)
  const [value, setValue] = useState('')
  const {
    error: geoError,
    data: geoData,
    isLoading: isLoadingGeo,
  } = useGetCityGeoQuery(city ?? 'London')
  const {
    error: weatherError,
    data: weatherData,
    isLoading: isLoadingWeather,
  } = useGetCityWeatherQuery(
    geoData
      ? {
          lat: geoData.lat,
          lon: geoData.lat,
        }
      : {
          lat: 51.509865,
          lon: -0.118092,
        },
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (geoData && weatherData) {
      dispatch(
        addCity({
          name: geoData.name,
          geo: { lat: geoData.lat, lon: geoData.lon },
          ...weatherData,
        }),
      )
    }
  }, [geoData, weatherData])

  return (
    <>
      <Stack>
        <TextField value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => setCity(value)}>Add city</Button>
      </Stack>
      {isLoadingGeo || (isLoadingWeather && <h1>Loading...</h1>)}
      {geoError || (weatherError && <h1>error</h1>)}
    </>
  )
}

export default AddCityForm
