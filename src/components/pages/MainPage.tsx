import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { getCitiesNamesFromLS } from '../../helpers/localStorage'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setCities } from '../../redux/reducers/citiesSlice'
import AddCityForm from '../AddCityForm'
import CardList from '../CardList'
import CityWeatherCard from '../CityWeatherCard'
import ModalCityWeather from '../ModalCityWeather'

const MainPage = () => {
  const { cities, shouldBeAdded } = useAppSelector((state) => state.citiesReducer)
  const allCities = useMemo(
    () => (shouldBeAdded ? [...cities, shouldBeAdded] : cities),
    [cities, shouldBeAdded],
  )
  const citiesNamesFromLS = useMemo(() => getCitiesNamesFromLS(), [])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCities(citiesNamesFromLS))
  }, [])

  return (
    <>
      <Box>
        <Container>
          <AddCityForm />
          <Box sx={{ paddingY: 5 }}>
            {!allCities.length ? (
              <Typography variant='h4' color='primary' sx={{ textAlign: 'center' }}>
                Now you don&apos;t have any city(
              </Typography>
            ) : (
              <CardList>
                {allCities.map((name, index) => (
                  <CityWeatherCard key={index} cityName={name} />
                ))}
              </CardList>
            )}
          </Box>
        </Container>
      </Box>
      <ModalCityWeather />
    </>
  )
}

export default MainPage
