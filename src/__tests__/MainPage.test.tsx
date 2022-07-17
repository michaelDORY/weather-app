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

    expect(await screen.findByTestId(/loadingCityCard/i)).toBeInTheDocument()
    expect(screen.queryByText(/notACity/i)).not.toBeInTheDocument()
    expect(await screen.findByText(/incorrect/i)).toBeInTheDocument()
  })

  test('Contains card with added city', async () => {
    renderWithProviders(<MainPage />)
    const input = screen.getByTestId('addingCityInput').querySelector('input')
    const submitButton = screen.getByRole('button', { name: /add( city)?/i })

    fireEvent.change(input!, { target: { value: 'London' } })
    fireEvent.click(submitButton)

    expect(await screen.findByTestId(/loadingCityCard/i)).toBeInTheDocument()

    expect(await screen.findByText(/100/i)).toBeInTheDocument()
    expect(screen.getAllByText(/sun/i)[0]).toBeInTheDocument()
    expect(screen.getByText(/london/i)).toBeInTheDocument()
  })

  test('City is deleted after click on delete button', async () => {
    const store = setupStore()
    store.dispatch(addCity('London'))

    renderWithProviders(<MainPage />, { store })

    expect(await screen.findByTestId('cityWeatherCard')).toBeInTheDocument()
    expect(screen.getByText(/london/i)).toBeInTheDocument()

    const deleteButton = screen.getByTestId('deleteCityButton')

    fireEvent.click(deleteButton)

    expect(await screen.queryByTestId('cityWeatherCard')).not.toBeInTheDocument()
    expect(await screen.queryByText(/london/i)).not.toBeInTheDocument()
  })

  test('After click on card modal opens', async () => {
    const store = setupStore()
    store.dispatch(addCity('London'))

    renderWithProviders(<MainPage />, { store })

    const card = await screen.findByTestId('cityWeatherCard')

    fireEvent.click(card)

    await waitFor(() => {
      screen.queryByTestId('cityWeatherModal')
      expect(screen.queryByTestId('cityWeatherModal')).toBeInTheDocument()
    })
  })
})
