import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SaveButton() {
  const classes = useStyles();

  return (
      <Button
        type='submit'
        variant="contained"
        color="primary"
        size="medium"
        className={classes.button}
        startIcon={<SaveIcon />}
        style={{backgroundColor: '#1D1D1D'}}
      >
        Save
      </Button>
  )
}