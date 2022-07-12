import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
  cityName: string
  temperature: string
  weatherMain: string
  weatherDesc: string
}

const CityWeatherCard: FC<Props> = (props) => {
  const { cityName, weatherMain, weatherDesc } = props
  const weatherImagePath = `../assets/icons/${weatherMain}.svg`
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component='img' height='140' image={weatherImagePath} alt='weather' />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {cityName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {weatherDesc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CityWeatherCard
