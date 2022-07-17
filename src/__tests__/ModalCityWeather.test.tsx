import ModalCityWeather from '../components/ModalCityWeather'
import { addCity, selectCity } from '../redux/reducers/citiesSlice'
import { server } from '../test_utils/server'
import { setupStore } from '../redux/store'
import { renderWithProviders } from '../test_utils'
import React from 'react'
import { screen } from '@testing-library/react'

global.ResizeObserver = require('resize-observer-polyfill')

const store = setupStore()

beforeAll(() => {
  store.dispatch(addCity('London'))
  store.dispatch(
    selectCity({
      weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'shiny' }],
      name: 'London',
      main: { temp: 100, temp_max: 120, temp_min: 90, feels_like: 100, humidity: 52 },
      id: 1,
    }),
  )
  server.listen()
})

afterAll(() => server.close())

describe('ModalCityWeather', () => {
  test('Modal contains correct info', async () => {
    renderWithProviders(<ModalCityWeather />, { store })
    expect(await screen.findByText(/sun/i)).toBeInTheDocument()
    expect(screen.getByText(/shiny/i)).toBeInTheDocument()
    expect(screen.getByText(/london/i)).toBeInTheDocument()
    expect(screen.getAllByText(/100/)[0]).toBeInTheDocument()
    expect(screen.getByText(/120/)).toBeInTheDocument()
    expect(screen.getByText(/90/)).toBeInTheDocument()
  })

  test('Chart renders', async () => {
    renderWithProviders(<ModalCityWeather />, { store })
    expect(await screen.findByTestId(/hourlyWeatherChartLoading/i))
    expect(await screen.findByTestId(/hourlyWeatherChart/i))
  })
})
