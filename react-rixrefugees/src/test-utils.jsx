import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from "@material-ui/core";
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import {BrowserRouter as Router}  from "react-router-dom";
import theme from "./theme";
import Store from './redux/configureStore';

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={Store}>
        <SnackbarProvider maxSnack={7} autoHideDuration={8000}>
            <ThemeProvider theme={theme}>
                <Router>
                    {children}
                </Router>
            </ThemeProvider>
        </SnackbarProvider>
    </Provider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }