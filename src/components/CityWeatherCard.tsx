import ClearIcon from '@mui/icons-material/Clear'
import UpdateIcon from '@mui/icons-material/Update'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC, useEffect, memo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { deleteCity, selectCity, updateCity } from '../redux/reducers/citiesSlice'
import { useGetCityWeatherQuery } from '../redux/services/weather'
import DynamicSvgIcon from './ui/DynamicSvgIcon'

interface Props {
  cityName: string
}

const CityWeatherCard: FC<Props> = memo((props: Props) => {
  const { cityName } = props
  const dispatch = useAppDispatch()
  const { cities } = useAppSelector((state) => state.citiesReducer)
  const isInitial = useRef(true)
  const { data, isLoading, refetch } = useGetCityWeatherQuery(isInitial.current ? '' : cityName)

  useEffect(() => {
    if (data) {
      console.log('data')
      const indexOfCity = cities.findIndex((item) => item.id === data.id)
      if (indexOfCity !== -1) {
        console.log('update')
        updateCity(data)
      }
    }
  }, [data])

  if (isLoading && !isInitial.current) return <div data-testid='loadingCityCard'></div>

  const { weather, main, name, id } = cities.find((item) => item.name === cityName)!
  const iconName = weather[0].icon

  return (
    <Card
      raised
      sx={{
        width: '100%',
        minHeight: 180,
        background: 'rgba(21,21,21,0.89)',
      }}
    >
      <CardActionArea
        data-testid='cityWeatherCard'
        onClick={(e) => {
          e.stopPropagation()
          dispatch(selectCity(id))
        }}
      >
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
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
            <Typography noWrap gutterBottom variant='h4' component='h3'>
              {name}
            </Typography>
            <Typography variant='h4' color='primary'>
              {Math.round(main.temp)}&#176;C
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
            <Box>
              <Typography variant='body1' color='text.secondary'>
                {weather[0].main}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {weather[0].description}
              </Typography>
            </Box>
            <Stack direction='row' justifyContent='end' alignItems='center' spacing={2}>
              <Fab
                data-testid='deleteCityButton'
                sx={{ background: 'grey' }}
                size='small'
                aria-label='delete'
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  dispatch(deleteCity(id))
                }}
              >
                <ClearIcon />
              </Fab>
              <Fab
                data-testid='updateCityButton'
                color='primary'
                size='small'
                aria-label='update'
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  refetch()
                  isInitial.current = false
                }}
              >
                <UpdateIcon />
              </Fab>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
})

CityWeatherCard.displayName = 'CityWeatherCard'

export default CityWeatherCard
