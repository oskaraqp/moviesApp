import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  topDiv: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center'
  }
})

const UnderConstruction = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.topDiv}>
      <Typography variant='h6' component='div'>
        Under Construction
      </Typography>
    </div>
  )
}

export default UnderConstruction
