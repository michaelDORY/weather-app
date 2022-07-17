import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { setupStore } from 'redux/store'
import type { AppStore, RootState } from 'redux/store'
import CustomSnackbar from '../components/CustomSnackbar'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<{}>): ReactJSXElement {
    return (
      <Provider store={store}>
        {children}
        <CustomSnackbar />
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
