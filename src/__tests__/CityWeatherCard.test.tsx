import CityWeatherCard from '../components/CityWeatherCard'
import { addCity, CityState } from '../redux/reducers/citiesSlice'
import { server } from '../test_utils/server'
import { setupStore } from '../redux/store'
import { renderWithProviders } from '../test_utils'
import React from 'react'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'

const initialCity: CityState = {
  weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'sun' }],
  name: 'London',
  main: { temp: 50, temp_max: 70, temp_min: 20, feels_like: 50, humidity: 52 },
  id: 1,
}

const store = setupStore()

beforeAll(() => {
  store.dispatch(addCity(initialCity))
  server.listen()
})

afterAll(() => server.close())

describe('CityWeatherCard', () => {
  test('After click on update button city updates', async () => {
    renderWithProviders(<CityWeatherCard cityName='London' />, { store })
    expect(await screen.findByText(/50/)).toBeInTheDocument()

    const updateButton = screen.getByTestId('updateCityButton')
    act(() => {
      fireEvent.click(updateButton)
    })

    await waitFor(() => {
      expect(screen.getByText(/100/)).toBeInTheDocument()
    })
  })
})
