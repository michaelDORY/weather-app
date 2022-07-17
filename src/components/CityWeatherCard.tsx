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
  useTheme,
} from '@mui/material'
import React, { FC, memo, useEffect } from 'react'
import { Rings } from 'react-loader-spinner'
import { addCityNameToLS } from '../helpers/localStorage'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addCity, clearShouldBeAdded, deleteCity, selectCity } from '../redux/reducers/citiesSlice'
import { openSnackBar } from '../redux/reducers/globalSlice'
import { useGetCityWeatherQuery } from '../redux/services/weather'
import { SnackBarSeverity } from '../types'
import DynamicSvgIcon from './ui/DynamicSvgIcon'

interface Props {
  cityName: string
}

const CityWeatherCard: FC<Props> = memo((props: Props) => {
  const { cityName } = props
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { shouldBeAdded } = useAppSelector((state) => state.citiesReducer)
  const { data: city, isLoading, error, refetch } = useGetCityWeatherQuery(cityName)

  useEffect(() => {
    if (city) {
      addCityNameToLS(city.name)
      dispatch(addCity(city.name))
      shouldBeAdded === cityName && dispatch(clearShouldBeAdded())
    }
  }, [city])

  if (isLoading)
    return (
      <Stack justifyContent='center' alignItems='center' data-testid='loadingCityCard'>
        <Rings color={theme.palette.primary.main} ariaLabel='loading-indicator' />
      </Stack>
    )
  if (error) {
    dispatch(clearShouldBeAdded())
    dispatch(openSnackBar({ message: 'Incorrect name of city', severity: SnackBarSeverity.ERROR }))
    return <></>
  }

  const { weather, main, name } = city!
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
        component='div'
        onClick={() => {
          dispatch(selectCity(city!))
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
                  dispatch(deleteCity(name))
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
                  dispatch(openSnackBar({ message: 'Updated', severity: SnackBarSeverity.SUCCESS }))
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
