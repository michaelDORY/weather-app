import { CITIES_NAMES_KEY } from '../constrains'

export const addCityNameToLS = (value: string) => {
  const string = localStorage.getItem(CITIES_NAMES_KEY)
  const object = string ? JSON.parse(string) : { names: [] }
  if (object.names) {
    if (!object.names.includes(value)) {
      object.names.push(value)
    }
  }
  localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify(object))
}

export const getCitiesNamesFromLS: () => string[] = () => {
  const string = localStorage.getItem(CITIES_NAMES_KEY)
  return string ? JSON.parse(string).names : []
}

export const deleteCityNameFromLS = (id: string) => {
  const names = getCitiesNamesFromLS()
  const newNames = names.filter((item) => item !== id)
  localStorage.setItem(CITIES_NAMES_KEY, JSON.stringify({ names: newNames }))
}
