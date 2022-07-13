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
  const { cityName, weatherMain, weatherDesc, icon, temperature } = props
  const iconName = icon.slice(0, icon.length - 1)

  return (
    <Card
      raised
      sx={{
        width: '100%',
        minHeight: 180,
        background: 'rgba(21,21,21,0.89)',
      }}
    >
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
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
            <Typography noWrap gutterBottom variant='h4' component='h3'>
              {cityName}
            </Typography>
            <Typography variant='h4' color='primary'>
              {temperature}
            </Typography>
          </Stack>
          <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2}>
            <Box>
              <Typography variant='body1' color='text.secondary'>
                {weatherMain}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {weatherDesc}
              </Typography>
            </Box>
            <Stack direction='row' justifyContent='end' alignItems='center' spacing={2}>
              <Fab
                sx={{ background: 'grey' }}
                size='small'
                aria-label='delete'
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
                }}
              >
                <ClearIcon />
              </Fab>
              <Fab
                color='primary'
                size='small'
                aria-label='update'
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation()
                  event.preventDefault()
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
}

export default CityWeatherCard
