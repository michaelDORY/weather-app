import { Box } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import Background from './Background'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Background />
      {children}
    </Box>
  )
}

export default Layout
