import { Stack, Typography } from '@mui/material'
import React, { FC, memo } from 'react'

interface Props {
  rowKey: string
  value: string
  sx?: object
}

const RowInfo: FC<Props> = memo(({ rowKey, value, sx = {} }: Props) => {
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
})
RowInfo.displayName = 'RowInfo'

export default RowInfo
