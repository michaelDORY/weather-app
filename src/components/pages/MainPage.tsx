import { Box, Container, Stack, Typography, useTheme } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { Rings } from 'react-loader-spinner'
import { getCitiesIdsFromLS } from '../../helpers/localStorage'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCities } from '../../redux/reducers/citiesSlice'
import { useGetCitiesWeatherQuery } from '../../redux/services/weather'
import AddCityForm from '../AddCityForm'
import CardList from '../CardList'
import CityWeatherCard from '../CityWeatherCard'

const MainPage = () => {
  const cities = useAppSelector((state) => state.citiesReducer)
  const citiesNamesFromLS = useMemo(() => getCitiesIdsFromLS(), [])
  const { data: citiesFromLS, isLoading } = useGetCitiesWeatherQuery(citiesNamesFromLS)
  const dispatch = useAppDispatch()
  const theme = useTheme()
  console.log('citiesNamesFromLS', citiesNamesFromLS)

  useEffect(() => {
    console.log('citiesFromLS', citiesFromLS)
    if (citiesFromLS && citiesFromLS.list.length) {
      dispatch(setCities(citiesFromLS.list))
    }
  }, [citiesFromLS])

  return (
    <Box>
      <Container>
        <AddCityForm />
        <Box sx={{ paddingY: 5 }}>
          {isLoading ? (
            <Stack alignItems='center'>
              <Rings color={theme.palette.primary.main} ariaLabel='loading-indicator' />
            </Stack>
          ) : !cities.length ? (
            <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
              Now you don&apos;t have any city(
            </Typography>
          ) : (
            <CardList>
              {cities.map(({ name, id }) => (
                <CityWeatherCard key={id} cityName={name} />
              ))}
            </CardList>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MainPage
