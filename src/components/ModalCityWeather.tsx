import { Grid, Modal, Paper, Typography } from '@mui/material'
import React from 'react'
import { ADDITIONAL_CITY_WEATHER_INFO } from '../constrains'
import { useAppDispatch, useAppSelector } from '../hooks'
import { unselectCity } from '../redux/reducers/citiesSlice'
import { ObjectKeys } from '../types'
import HourlyChart from './HourlyChart'
import DynamicSvgIcon from './ui/DynamicSvgIcon'
import RowInfo from './ui/RowInfo'

const paperSx = {
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  top: 25,
  bgcolor: 'background.paper',
  borderRadius: 2,
  p: 5,
}

const ModalCityWeather = () => {
  const { selectedCity } = useAppSelector((state) => state.citiesReducer)
  const dispatch = useAppDispatch()

  if (!selectedCity) return <></>

  const { weather, name } = selectedCity
  const main: ObjectKeys = selectedCity.main
  const iconName = weather[0].icon

  return (
    <Modal
      data-testid='cityWeatherModal'
      open={!!selectedCity}
      onClose={() => dispatch(unselectCity())}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      componentsProps={{
        backdrop: {
          style: {
            background: 'linear-gradient(rgba(5,9,80,0.87), rgba(0,33,2,0.87))',
          },
        },
      }}
      sx={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      <Paper sx={paperSx}>
        <Grid
          container
          gap={4}
          minWidth={200}
          maxWidth={1000}
          justifyContent='center'
          alignItems='center'
        >
          <Grid container item xs={12} lg={5}>
            <Grid container item xs={12}>
              <Grid xs={12} item container direction='row' gap={2}>
                <Grid item xs={5}>
                  <Typography variant='h4' color='primary'>
                    {name}
                  </Typography>
                  <Typography variant='body1'>{new Date().toLocaleDateString()}</Typography>
                  <Typography variant='body1'>{weather[0].main}</Typography>
                  <Typography variant='body2'>{weather[0].description}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <DynamicSvgIcon height={65} name={iconName} />
                </Grid>
              </Grid>
              <Grid xs={12} item>
                <Typography variant='h4' color='primary' sx={{ mt: 2 }}>
                  {Math.round(main.temp)}&#176;C
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {ADDITIONAL_CITY_WEATHER_INFO.map((item, index) => (
                <RowInfo
                  key={index.toString()}
                  rowKey={item.title}
                  value={Math.round(main[item.key]) + item.unit}
                  sx={
                    index !== ADDITIONAL_CITY_WEATHER_INFO.length - 1
                      ? { borderBottom: '1px solid grey' }
                      : {}
                  }
                />
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={5} justifyContent='center'>
            <HourlyChart />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default ModalCityWeather
