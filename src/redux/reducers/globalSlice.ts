import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SnackBarSeverity } from '../../types'

export interface SnackBarState {
  isOpen: boolean
  severity: SnackBarSeverity
  message: string
}

export interface GlobalState {
  snackbar: SnackBarState
}

const initialState: GlobalState = {
  snackbar: {
    isOpen: false,
    severity: SnackBarSeverity.ERROR,
    message: 'Error',
  },
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    openSnackBar: (
      state,
      action: PayloadAction<{ severity: SnackBarSeverity; message: string }>,
    ) => {
      state.snackbar = { ...action.payload, isOpen: true }
      return state
    },
    closeSnackBar: (state) => {
      state.snackbar = initialState.snackbar
      return state
    },
  },
})

export const { openSnackBar, closeSnackBar } = globalSlice.actions

export default globalSlice.reducer
