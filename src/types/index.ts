export type CityWeatherParams = {
  lat: number
  lon: number
}

// | null

export interface FetchedCityWeather {
  id: string | number
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    humidity: number
  }
}

export interface FetchedCityGeo {
  name: string
  lat: number
  lon: number
  country: string
}
