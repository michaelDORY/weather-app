import { Box, Container } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../hooks'
import AddCityForm from '../AddCityForm'
import CardList from '../CardList'
import CityWeatherCard from '../CityWeatherCard'

const MainPage = () => {
  const cities = useAppSelector((state) => state.citiesReducer)
  return (
    <Box>
      <Container>
        <AddCityForm />
        <CardList styles={{ mt: 4 }}>
          {cities.map(({ weather, main, id, name }) => (
            <CityWeatherCard
              key={id}
              icon={weather[0].icon}
              cityName={name}
              temperature={main.temp}
              weatherMain={weather[0].main}
              weatherDesc={weather[0].description}
            />
          ))}
        </CardList>
      </Container>
    </Box>
  )
}

export default MainPage
