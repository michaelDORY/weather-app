import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: 'uppercase',
        },
      },
    },
  },
})

export default theme
