export interface FetchedCityWeather {
  id: string | number
  name: string
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    },
  ]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
}
