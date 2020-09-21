import React, { useEffect } from 'react'

import { useMst } from '../mobx/Root'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import useMediaQuery from '@material-ui/core/useMediaQuery'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import MomentUtils from '@date-io/moment'

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
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

const CreateEditTime = observer((props) => {
  const { settings } = useMst()

  const theme = useTheme()
  const classes = useStyles()

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [selectedTimeValue, setSelectedTimeValue] = React.useState(moment())
  const [activeValue, setActiveValue] = React.useState(true)

  useEffect(() => {
    if (settings.selectedTime && settings.showingEditScheduleMovieModal) {
      setSelectedTimeValue(moment.unix(settings.selectedTime.time))
      setActiveValue(settings.selectedTime.estadoActivo)
    } else {
      setSelectedTimeValue(moment())
      setActiveValue(true)
    }
  }, [settings.selectedTime, settings.showingEditScheduleMovieModal, settings.showingCreateScheduleMovieModal])

  const _handleClose = () => {
    settings.showingEditScheduleMovieModal ? settings.hideEditScheduleMovie() : settings.hideCreateScheduleMovie()
  }
  const _handleSubmit = (event) => {
    event.preventDefault()

    if (settings.selectedTime && settings.showingEditScheduleMovieModal) {
      settings.selectedTime.updateData(moment(selectedTimeValue).unix(), activeValue)
    } else {
      settings.selectedMovie.addTimeItem({
        time: moment(selectedTimeValue).unix(),
        estadoActivo: activeValue
      })
    }
  }

  const _handleTimeChange = (date) => {
    setSelectedTimeValue(date)
  }

  const _handleSelectChange = (value) => {
    setActiveValue(value.target.value)
  }

  return (
    <div>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>

        <Dialog open={settings.showingCreateScheduleMovieModal || settings.showingEditScheduleMovieModal} onClose={_handleClose} fullScreen={fullScreen} aria-labelledby='titulo'>
          <form onSubmit={_handleSubmit}>
            <DialogTitle id='titulo'>{settings.showingCreateScheduleMovieModal ? 'Nuevo Turno' : 'Modificar Turno'}</DialogTitle>
            <DialogContent>
              <KeyboardTimePicker
                id='turno'
                label='Turno'
                variant='outlined'
                className={classes.dateControl}
                fullWidth
                value={selectedTimeValue}
                onChange={_handleTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'Turno'
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

export default CreateEditTime
