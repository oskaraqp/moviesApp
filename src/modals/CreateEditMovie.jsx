import React, { useEffect } from 'react'

import { useMst } from '../mobx/Root'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import MomentUtils from '@date-io/moment'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { observer } from 'mobx-react-lite'

import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: theme.spacing(1)
  },
  inputControl: {
    marginTop: theme.spacing(1)
  },
  dateControl: {
    marginTop: theme.spacing(1)
  }
}))

const CreateEditMovie = observer((props) => {
  const { movies, settings } = useMst()

  const theme = useTheme()
  const classes = useStyles()

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [nameValue, setNameValue] = React.useState('')
  const [selectedDateValue, setSelectedDateValue] = React.useState(moment())
  const [activeValue, setActiveValue] = React.useState(true)

  useEffect(() => {
    if (settings.selectedMovie && settings.showingEditMovieModal) {
      setNameValue(settings.selectedMovie.nombre)
      setSelectedDateValue(moment.unix(settings.selectedMovie.fecha))
      setActiveValue(settings.selectedMovie.estadoActivo)
    } else {
      setNameValue('')
      setSelectedDateValue(moment())
      setActiveValue(true)
    }
  }, [settings.selectedMovie, settings.showingEditMovieModal, settings.showingCreateMovieModal])

  const _handleClose = () => {
    settings.showingEditMovieModal ? settings.hideEditMovie() : settings.hideCreateMovie()
  }
  const _handleSubmit = (event) => {
    event.preventDefault()

    if (settings.selectedMovie && settings.showingEditMovieModal) {
      settings.selectedMovie.updateData(nameValue, moment(selectedDateValue).unix(), activeValue)
    } else {
      movies.addMovieItem({
        nombre: nameValue,
        fecha: moment(selectedDateValue).unix(),
        estadoActivo: activeValue
      })
    }
  }
  const _handleNameChange = (event) => {
    setNameValue(event.target.value)
  }
  const _handleDateChange = (date) => {
    setSelectedDateValue(date)
  }

  const _handleSelectChange = (value) => {
    setActiveValue(value.target.value)
  }

  return (
    <div>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>

        <Dialog open={settings.showingCreateMovieModal || settings.showingEditMovieModal} onClose={_handleClose} fullScreen={fullScreen} aria-labelledby='titulo'>
          <form onSubmit={_handleSubmit}>
            <DialogTitle id='titulo'>{settings.showingCreateMovieModal ? 'Nueva Película' : 'Modificar Película'}</DialogTitle>
            <DialogContent>
              <TextField
                id='nombre'
                label='Nombre de Película'
                required
                variant='outlined'
                placeholder='Ingrese Nombre'
                className={classes.inputControl}
                fullWidth
                value={nameValue}
                onChange={_handleNameChange}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                id='fecha'
                label='Fecha de Publicacíon'
                variant='outlined'
                className={classes.dateControl}
                fullWidth
                format='MM/DD/YYYY'
                value={selectedDateValue}
                onChange={_handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'Fecha de Publicacíon'
                }}
              />

              <FormControl variant='outlined' className={classes.formControl} fullWidth>
                <InputLabel id='estadoActivo'>Estado</InputLabel>
                <Select
                  id='estadoActivoSelector'
                  labelId='estadoActivo'
                  variant='outlined'
                  fullWidth
                  value={activeValue}
                  onChange={_handleSelectChange}
                  label='Estado'
                >
                  <MenuItem value>Activo</MenuItem>
                  <MenuItem value={false}>Inactivo</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>

            <DialogActions>
              <Button onClick={_handleClose} color='primary'>
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                Guardar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </MuiPickersUtilsProvider>
    </div>
  )
})

export default CreateEditMovie
