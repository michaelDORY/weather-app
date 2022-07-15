import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import MainPage from '../components/pages/MainPage'
import { addCity } from '../redux/reducers/citiesSlice'
import { setupStore } from '../redux/store'
import { renderWithProviders } from '../test_utils'
import { server } from 'test_utils/server'

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('MainPage', () => {
  test('Contains form for adding city', () => {
    renderWithProviders(<MainPage />)
    expect(screen.getByRole('button', { name: /add( city)?/i })).toBeInTheDocument()
  })

  test('Error when trying to add not a city', async () => {
    renderWithProviders(<MainPage />)
    const input = screen.getByTestId('addingCityInput').querySelector('input')
    const submitButton = screen.getByRole('button', { name: /add( city)?/i })
    expect(input).toBeInTheDocument()

    fireEvent.change(input!, { target: { value: 'notACity' } })
    fireEvent.click(submitButton)

    expect(await screen.getByTestId(/rings-loading/)).toBeInTheDocument()

    await waitFor(() => {
      expect(document.getElementsByClassName('Mui-error')[0]).toBeInTheDocument()
    })
  })

  test('Contains card with added city', async () => {
    renderWithProviders(<MainPage />)
    const input = screen.getByTestId('addingCityInput').querySelector('input')
    const submitButton = screen.getByRole('button', { name: /add( city)?/i })

    fireEvent.change(input!, { target: { value: 'London' } })
    fireEvent.click(submitButton)

    expect(await screen.getByTestId(/rings-loading/)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/100/i)).toBeInTheDocument()
      expect(screen.getAllByText(/sun/i)[0]).toBeInTheDocument()
      expect(screen.getByText(/london/i)).toBeInTheDocument()
    })
  })

  test('City is deleted after click on delete button', async () => {
    const store = setupStore()
    store.dispatch(
      addCity({
        weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'sun' }],
        name: 'London',
        main: { temp: 100, temp_max: 120, temp_min: 90, feels_like: 100, humidity: 52 },
        id: 1,
      }),
    )

    renderWithProviders(<MainPage />, { store })

    await waitFor(() => {
      expect(screen.getByTestId('cityWeatherCard')).toBeInTheDocument()
      expect(screen.getByText(/london/i)).toBeInTheDocument()
    })

    const deleteButton = screen.getByTestId('deleteCityButton')

    fireEvent.click(deleteButton)

    expect(await screen.queryByTestId('cityWeatherCard')).not.toBeInTheDocument()
    expect(await screen.queryByText(/london/i)).not.toBeInTheDocument()
  })

  test('After click on card modal opens', async () => {
    const store = setupStore()
    store.dispatch(
      addCity({
        weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'sun' }],
        name: 'London',
        main: { temp: 100, temp_max: 120, temp_min: 90, feels_like: 100, humidity: 52 },
        id: 1,
      }),
    )

    renderWithProviders(<MainPage />, { store })

    const card = await waitFor(() => screen.findByTestId('cityWeatherCard'))

    fireEvent.click(card)

    await waitFor(() => {
      screen.queryByTestId('cityWeatherModal')
      expect(screen.queryByTestId('cityWeatherModal')).toBeInTheDocument()
    })
  })
})
