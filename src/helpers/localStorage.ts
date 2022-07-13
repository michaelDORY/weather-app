import { CITIES_IDS_KEY } from '../constrains'

export const addCityIdToLS = (value: string | number) => {
  const string = localStorage.getItem(CITIES_IDS_KEY)
  const object = string ? JSON.parse(string) : { ids: [] }
  if (object.ids) {
    if (!object.ids.includes(value)) {
      object.ids.push(value)
    }
  }
  localStorage.setItem(CITIES_IDS_KEY, JSON.stringify(object))
}

export const getCitiesIdsFromLS: () => (string | number)[] = () => {
  const string = localStorage.getItem(CITIES_IDS_KEY)
  return string ? JSON.parse(string).ids : []
}

export const deleteCityIdFromLS = (id: string | number) => {
  const ids = getCitiesIdsFromLS()
  const newIds = ids.filter((item) => item !== id)
  localStorage.setItem(CITIES_IDS_KEY, JSON.stringify({ ids: newIds }))
}
