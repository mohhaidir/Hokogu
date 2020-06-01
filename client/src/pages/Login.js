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
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../store/actions/userActions'


import { makeStyles, withStyles } from '@material-ui/core/styles';

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
    backgroundImage: 'url(https://c0.wallpaperflare.com/preview/199/800/968/macarons-pink-aqua-pastels.jpg)',
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

export default function Login() {
  const isLoggedIn = useSelector((state)=>state.userReducer.isLoggedIn)
  const history = useHistory();
  const dispatch = useDispatch()
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandle = (e) => {
    setEmail(e.target.value)
  }

  const passwordHandle = (e) => {
    setPassword(e.target.value)
  }

  const clientLogin = () => {
    let data = {
      email: email,
      password: password,
    }
    dispatch(login(data))
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
        <br/>
        <br/>

        <div className={classes.paper}>
          <h1 className='accountText'>
                Welcome!
          </h1>
          <form className={classes.form} noValidate>
            <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            onChange= {passwordHandle}
            />


            <ColorButton onClick={clientLogin} fullWidth variant="contained" color="primary" className={classes.margin}>
            Login
            </ColorButton>

            
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button> */}

            <Grid style={{marginTop: '30px'}}container>
              <Grid item xs>
              </Grid>
              <Grid item>

              <Link  to='/register'>
                <p style={{ color: '#FF5F6D', fontSize: '17px'}} >Don't have an account? Sign Up</p>
              </Link>

              {/* <Link to='/register' style={{color: '#FF5F6D', fontSize: '17px'}} href="" variant="body2">
                  {"Don't have an account? Sign Up"}
              </Link> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
