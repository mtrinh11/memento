import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function UploadButton({onclick, text}) {
  const classes = useStyles();

  return (
    <Button
        variant="contained"
        color="secondary"
        style={{backgroundColor: '#1D1D1D'}}
        size="medium"
        className={classes.button}
        startIcon={<CloudUploadIcon />}
        onClick={() => onclick()}
    >
        {text}
    </Button>
  )
}