
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default (props) => {
  const classes = useStyles();

  return (
    props.fieldType === 'textfield' ? (
        <TextField
        id='filled-multiline-flexible'
        required={props.required}
        style={props.style}
        type={props.type}
        name={props.name}
        value={props.value}
        multiline
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
        variant="filled"
        />
  ) : (
        <TextField
        id='filled-basic'
        // id="standard-textarea"
        required={props.required}
        style={props.style}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={(e) => props.onChange(e)}
        placeholder={props.placeholder}
        autoComplete="false"
        variant="filled"
        />
  )
  )
}
  
