import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LargeGradientButton from '../components/LargeGardientButton'
import {useDispatch, useSelector} from 'react-redux'
import {register} from '../store/actions/userActions'


const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#FF5F6D'),
      backgroundColor: '#ff959c',
      '&:hover': {
        backgroundColor: '#FF5F6D',
      },
    },
  }))(Button);
  


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: '10px'
      },
  root: {
    height: '92vh',
  },
  image: {
    backgroundImage: 'url(https://www.ecopetit.cat/wpic/mpic/57-573449_sushi-wallpapers-download.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#ff959c',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {

    const history = useHistory()
    const isLoggedIn = useSelector((state)=>state.userReducer.isLoggedIn)
    const dispatch = useDispatch()
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const nameHandle = (e) => {
        setName(e.target.value)
    }

    const emailHandle = (e) => {
        setEmail(e.target.value)
    }

    const passwordHandle = (e) => {
        setPassword(e.target.value)
    }

    const confirmPasswordHandle = (e) => {
        setConfirmPassword(e.target.value)
    }
    const signUp = () => {
        if(password === confirmPassword){
            let data = {
                name: name,
                email: email,
                password: password,
                avatar: 'none',
            }
            dispatch(register(data))
        }
    }

    useEffect(()=>{
        if(isLoggedIn){
            history.push(`/`)
        }
    }, [isLoggedIn])

    return (
        <Grid container component="main" className={classes.root}>
        <CssBaseline/>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid style={{  backgroundColor: 'white',boxShadow: 'none'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <br/>
            <br/>

            <div className={classes.paper}>
                <h1 className='accountText'>
                    Create an account
                </h1>

            <form className={classes.form} noValidate>

                <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Your Name"
                name="name"
                autoFocus
                onChange= {nameHandle}
                />

                <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange= {emailHandle}
                />

                <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange= {passwordHandle}

                />
                <TextField
                color="secondary"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmpassword"
                label="Confirm Password"
                type="password"
                id="confirmpassword"
                onChange= {confirmPasswordHandle}

                />

                <ColorButton onClick={signUp} fullWidth variant="contained" color="primary" className={classes.margin}>
                Register
                </ColorButton>

            
                <Grid style={{marginTop: '30px'}}container>
                <Grid item xs>
                </Grid>
                <Grid item>
                <Link  to='/login'>
                    <a style={{ color: '#FF5F6D', fontSize: '17px'}} href=''>Already Have an Account? Log In</a>
                </Link>
                </Grid>
                </Grid>
            </form>
            </div>
        </Grid>
        </Grid>
  );
}
