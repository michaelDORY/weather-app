import { rest } from 'msw'
import CityWeatherCard from '../components/CityWeatherCard'
import { addCity } from '../redux/reducers/citiesSlice'
import { server } from '../test_utils/server'
import { setupStore } from '../redux/store'
import { renderWithProviders } from '../test_utils'
import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react'
import { FetchedCityWeather } from '../types'

const store = setupStore()

beforeAll(() => {
  store.dispatch(addCity('London'))
  server.listen()
})

afterAll(() => server.close())

describe('CityWeatherCard', () => {
  test('After click on update button city updates', async () => {
    renderWithProviders(<CityWeatherCard cityName='London' />, { store })
    expect(await screen.findByText(/100/)).toBeInTheDocument()

    server.use(
      rest.get(`http://api.openweathermap.org/data/2.5/weather`, (req, res, ctx) => {
        const mockApiResponse: FetchedCityWeather = {
          weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'sun' }],
          name: 'London',
          main: { temp: 20, temp_max: 20, temp_min: 20, feels_like: 20, humidity: 20 },
          id: 1,
        }
        return res(ctx.json(mockApiResponse))
      }),
    )

    const updateButton = screen.getByTestId('updateCityButton')
    act(() => {
      fireEvent.click(updateButton)
    })

    expect(await screen.findByText(/20/)).toBeInTheDocument()
  })
})
