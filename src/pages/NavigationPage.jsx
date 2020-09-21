import React, { useEffect } from 'react'

import { useMst } from '../mobx/Root'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import { Link, Route, Switch, useLocation, useHistory } from 'react-router-dom'

import { observer } from 'mobx-react-lite'

import movies from '../tabs/Movies'
import schedule from '../tabs/Schedule'
import underConstruction from '../tabs/UnderConstruction'

const NavigationPage = observer((props) => {
  const { settings } = useMst()

  const theme = useTheme()

  const mediumScreen = useMediaQuery(theme.breakpoints.up('md'))

  const location = useLocation()
  const history = useHistory()

  const [value, setValue] = React.useState(1)

  useEffect(() => {
    console.log('Location changed', location.pathname)
    if (location.pathname !== '/schedule') {
      settings.hideScheduleMovie()
    }
  }, [location, settings])

  useEffect(() => {
    if (settings.showingScheduleMovieView) {
      history.push('/schedule')
    }
  }, [settings.showingScheduleMovieView, history])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <>
      <Tabs
        orientation={mediumScreen ? 'vertical' : 'horizontal'}
        variant='scrollable'
        value={value}
        onChange={handleChange}
        aria-label='main'
      >
        <Tab label='Dashboard' id='dashboard' to='/under_construction' component={Link} />
        <Tab label='Películas' id='movies' to='/movies' component={Link} />
        <Tab label='Turnos' id='turnos' to='/under_construction' component={Link} />
        <Tab label='Administradores' id='administradores' to='/under_construction' component={Link} />
        <Tab label='Perfil' id='perfil' to='/under_construction' component={Link} />
        <Tab label='Cerrar Sesión' id='cerrar' to='/under_construction' component={Link} />
      </Tabs>
      <Switch>
        <Route path='/movies' component={movies} />
        <Route path='/schedule' component={schedule} />
        <Route path='/under_construction' component={underConstruction} />
        <Route path='*' component={movies} />
      </Switch>
    </>
  )
})

export default NavigationPage
