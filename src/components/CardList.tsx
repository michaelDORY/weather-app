import { Grid } from '@mui/material'
import React, { Children, FC, ReactNode } from 'react'
import { v4 } from 'uuid'

interface Props {
  styles: object
  children: ReactNode
}

const CardList: FC<Props> = ({ styles, children }) => {
  return (
    <Grid container spacing={3} sx={{ ...styles }}>
      {Children.toArray(children).map((item) => (
        <Grid key={v4()} item md={3} sm={3}>
          {item}
        </Grid>
      ))}
    </Grid>
  )
}

export default CardList
