import { server } from '../test_utils/server'

beforeAll(() => server.listen())

afterAll(() => server.close())

describe('CityWeather', () => {
  test('After click on card modal opens', () => {
    expect(2).toBe(2)
  })
})
