export interface ObjectKeys {
  [key: string]: any
}

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

interface FetchedHourlyForecastItem {
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
  dt_txt: string
}

export interface FetchedHourlyForecast {
  list: FetchedHourlyForecastItem[]
}

export type HourlyForecast = { temp: number; hours: string }[]

export enum SnackBarSeverity {
  // eslint-disable-next-line no-unused-vars
  SUCCESS = 'success',
  // eslint-disable-next-line no-unused-vars
  ERROR = 'error',
}
