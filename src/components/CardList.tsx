import { Grid } from '@mui/material'
import React, { Children, FC, ReactNode } from 'react'
import { v4 } from 'uuid'

interface Props {
  children: ReactNode
}

const CardList: FC<Props> = ({ children }) => {
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
