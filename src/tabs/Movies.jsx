import React from 'react'

import { useMst } from '../mobx/Root'

import { makeStyles } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import IconButton from '@material-ui/core/IconButton'
import CreateIcon from '@material-ui/icons/Create'
import DehazeIcon from '@material-ui/icons/Dehaze'
import DeleteIcon from '@material-ui/icons/Delete'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { observer } from 'mobx-react-lite'

import moment from 'moment'

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    margin: 20
  },
  topDiv: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    flexGrow: 1
  }
})

const Movies = observer((props) => {
  const { movies, settings } = useMst()

  const classes = useStyles()

  const firstCell = {
    component: 'th',
    scope: 'row'
  }

  const _handleCreateMovieClicked = () => {
    settings.showCreateMovie()
  }

  return (

    <div className={classes.container}>
      <div className={classes.topDiv}>
        <Typography variant='h6' component='span' className={classes.title}>
          Peliculas
        </Typography>
        <Button variant='contained' color='primary' onClick={_handleCreateMovieClicked}>
          Nueva Pelicula
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='movies' size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align='center'>F.&nbsp;Publicación</TableCell>
              <TableCell align='center'>Estado</TableCell>
              <TableCell align='right' colSpan={3} />
            </TableRow>
          </TableHead>
          <TableBody>
            {
              movies.items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell align='center' {...((index === 0) && firstCell)}>
                    {item.id}
                  </TableCell>
                  <TableCell>{item.nombre}</TableCell>
                  <TableCell align='center'>{moment.unix(item.fecha).format('DD/MM/YY')}</TableCell>
                  <TableCell align='center'>{item.estadoActivo ? 'Activo' : ' Inactivo'}</TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='edit' onClick={item.handleEdit}>
                      <CreateIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='turn' onClick={item.handleSchedule}>
                      <DehazeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton aria-label='delete' onClick={item.handleRemove}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
})

export default Movies
