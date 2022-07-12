import { createTheme } from '@mui/material'

const theme = createTheme({
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
