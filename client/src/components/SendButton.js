import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SaveButton({ text}) {
  const classes = useStyles();

  return (
      <Button
        type='submit'
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        style={{backgroundColor: '#1D1D1D'}}
      >
        {text}
      </Button>
  )
}