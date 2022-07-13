import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffef25',
    },
    secondary: {
      main: '#00489b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          textTransform: 'uppercase',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 12,
      },
      styleOverrides: {
        root: {
          background: 'rgba(33,29,29,0.68)',
        },
      },
    },
  },
})

export default theme
