import { rest } from 'msw'
import { FetchedCityWeather } from '../../types'

const handlers = [
  rest.get(`http://api.openweathermap.org/data/2.5/weather`, (req, res, ctx) => {
    if (req.url.searchParams.get('q') === 'notACity') {
      return res.networkError('No such city')
    }
    const mockApiResponse: FetchedCityWeather = {
      weather: [{ id: 12, main: 'Sun', icon: '10n', description: 'sun' }],
      name: 'London',
      main: { temp: 100, temp_max: 120, temp_min: 90, feels_like: 100, humidity: 52 },
      id: 1,
    }
    return res(ctx.json(mockApiResponse))
  }),
  rest.get(`http://api.openweathermap.org/data/2.5/group`, (req, res, ctx) => {
    if (req.url.searchParams.get('id') === '') {
      return res.networkError('No cities')
    }
    const mockApiResponse: { list: FetchedCityWeather[] } = {
      list: [
        {
          weather: [{ id: 13, main: 'Rain', icon: '3d', description: 'rain' }],
          name: 'Kharkiv',
          main: { temp: 0, temp_max: 12, temp_min: -3, feels_like: 0, humidity: 12 },
          id: 2,
        },
      ],
    }
    return res(ctx.json(mockApiResponse))
  }),
]

export { handlers }
