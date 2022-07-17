import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { closeSnackBar } from '../redux/reducers/globalSlice'

const CustomSnackbar = () => {
  const { isOpen, message, severity } = useAppSelector((state) => state.globalReducer).snackbar
  const dispatch = useAppDispatch()

  if (!isOpen) return <></>

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={() => dispatch(closeSnackBar())}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default CustomSnackbar
