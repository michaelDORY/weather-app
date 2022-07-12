import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React, { FC } from 'react'
import DynamicSvgIcon from './ui/DynamicSvgIcon'

interface Props {
  cityName: string
  temperature: number
  weatherMain: string
  weatherDesc: string
  icon: string
}

const CityWeatherCard: FC<Props> = (props) => {
  const { cityName, weatherMain, weatherDesc, icon } = props
  const iconName = icon.slice(0, icon.length - 1)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingY: '5px',
          }}
        >
          <DynamicSvgIcon height={65} name={iconName} />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {cityName}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {weatherDesc}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {weatherMain}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CityWeatherCard
