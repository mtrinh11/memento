import React from 'react';
import '../styles/HomePage.css';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default () => {
    const classes = useStyles();

    return (
        <div style={{width: '100%', minHeight:'91vh', backgroundSize: 'cover', backgroundImage:"url('https://wallup.net/wp-content/uploads/2017/03/28/440724-Japanese-digital_art-minimalism-simple_background-trees-nature-landscape-mountians-horizon-Sun-monochrome-Mount_Fuji.jpg')"}}>
            <div style={{padding: '100px', 
                margin: '10vh 10vw', 
                backgroundImage: "url('https://1.bp.blogspot.com/-6FRMwdc84-Y/VoFBuDjEpcI/AAAAAAAAL1g/xDgA63_Vlfo/s1600/Grand-canyon-stars-Nankoweap_SQ.jpg')",
                backgroundSize: 'cover', 
                width: '20vw',
                borderRadius: '10px',
                boxShadow: '3px 3px 20px black',
                color: 'white',
                textShadow:'2px 2px 5px black'
            }}>
                <h1> Welcome to memento!</h1>
                {/* write description */}
                <h3> this is what it's about</h3>
                <div>
                    <Link to='/register' style={{textDecoration: 'none'}}> 
                        <Button
                        style={{backgroundColor: '#1D1D1D'}}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        >Sign Up</Button>
                    </Link>
                    <Link to='/login' style={{textDecoration: 'none'}}> 
                        <Button
                        style={{backgroundColor: '#1D1D1D'}}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        >Sign In</Button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}