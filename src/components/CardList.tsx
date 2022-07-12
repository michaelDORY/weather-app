import { Grid } from '@mui/material'
import React, { Children, FC, ReactNode } from 'react'
import { v4 } from 'uuid'
import { useAppSelector } from '../hooks'

interface Props {
  children: ReactNode
}

const CardList: FC<Props> = ({ children }) => {
  // const [cities, setCities] = useState([]);
  const cities = useAppSelector((state) => state.citiesReducer)
  console.log(cities)
  return (
    <Grid container>
      {Children.toArray(children).map((item) => (
        <Grid key={v4()} item>
          {item}
        </Grid>
      ))}
    </Grid>
  )
}

export default CardList
