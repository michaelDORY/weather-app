import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Rings } from 'react-loader-spinner'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useAppSelector } from '../hooks'
import { useGetHourlyForecastQuery } from '../redux/services/weather'

const HourlyChart = () => {
  const { selectedCity } = useAppSelector((state) => state.citiesReducer)
  const theme = useTheme()
  const {
    data: hourlyForecast,
    isLoading,
    error,
  } = useGetHourlyForecastQuery(selectedCity ? selectedCity.name : '')

  if (isLoading) {
    return (
      <Stack sx={{ width: '100%', height: '100%' }} justifyContent='center' alignItems='center'>
        <Rings color={theme.palette.primary.main} ariaLabel='loading-indicator' />
      </Stack>
    )
  }

  if (error) return <Typography sx={{ textAlight: 'center' }}>Can&apos;t load chart(</Typography>

  return (
    <ResponsiveContainer height={200} minWidth={200}>
      <BarChart data={hourlyForecast} margin={{ left: -30 }} height={200} width={300}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='hours' />
        <YAxis />
        <Tooltip />
        <Bar dataKey='temp' fill={theme.palette.secondary.main} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default HourlyChart
