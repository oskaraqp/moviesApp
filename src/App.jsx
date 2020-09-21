import React from 'react'

import Grid from '@material-ui/core/Grid'

import { BrowserRouter } from 'react-router-dom'

import { Provider, rootStore } from './mobx/Root'

import NavigationPage from './pages/NavigationPage'

import CreateEditMovie from './modals/CreateEditMovie'
import CreateEditTime from './modals/CreateEditTime'

function App () {
  return (
    <Provider value={rootStore}>
      <Grid
        container
        spacing={0}
        alignItems='center'
        justify='flex-start'
        direction='column'
      >
        <Grid container item sm={12} lg={8}>
          <BrowserRouter>
            <NavigationPage />
          </BrowserRouter>
        </Grid>
      </Grid>
      <CreateEditMovie />
      <CreateEditTime />
    </Provider>
  )
}

export default App
