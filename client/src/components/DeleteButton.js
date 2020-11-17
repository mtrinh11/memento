import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function DeleteButton({onclick, text}) {
  const classes = useStyles();

  return (
    <Button
        variant="contained"
        color="secondary"
        style={{backgroundColor: '#1D1D1D'}}
        size="medium"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={() => onclick()}
    >
        {text}
    </Button>
  )
}