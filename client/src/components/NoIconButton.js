import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function NoIconButton({onclick, text}) {
  const classes = useStyles();

  return (
    <Button
        variant="contained"
        color="secondary"
        style={{backgroundColor: '#1D1D1D'}}
        size="medium"
        className={classes.button}
        onClick={() => onclick()}
    >
        {text}
    </Button>
  )
}