import { Stack, Typography } from '@mui/material'
import React, { FC } from 'react'

interface Props {
  rowKey: string
  value: string
  sx?: object
}

const RowInfo: FC<Props> = ({ rowKey, value, sx = {} }) => {
  return (
    <Stack
      alignItems='center'
      direction='row'
      justifyContent='space-between'
      sx={{ paddingY: 2, ...sx }}
    >
      <Typography>{rowKey}</Typography>
      <Typography>{value}</Typography>
    </Stack>
  )
}

export default RowInfo
