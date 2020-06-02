import React,{useState, useEffect} from 'react'
import clsx from 'clsx';
import {Link, useHistory} from 'react-router-dom'
import {logout, setIsLoggedIn, setToken, setName, setAvatar} from '../store/actions/userActions'
import {Button} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AccountMenu from './AccountMenu'
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import StarIcon from '@material-ui/icons/Star';
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import GradientButton from './GradientButton'
import {useSelector,useDispatch} from 'react-redux'
import FavoriteIcon from '@material-ui/icons/Favorite'
import LoginForm from './LoginForm'
const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.01), 0 3px 6px rgba(0,0,0,0.23)',
    // boxShadow: 'none',
    backgroundColor: '#fdfff5',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    color: "#ff9687"
  },
  drawer: {
    textAlign: 'center',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    textAlign: 'center',
    backgroundColor: "#fdfff5",
    width: drawerWidth
  },
  loginDrawerPaper: {
    backgroundColor: '#fdfff5',
    width: '340px',
    height: '100vh'
  },
  drawerPaperAccountName:{
    padding: '3vh',
    borderRadius: '20px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#fdfff5',
    marginTop: '10vh',
    width: '25vh',
    height: 'auto',
  },
  drawerPaperAccountAvatar:{
    padding: '3vh',
    borderRadius: '20px',
    margin: 'auto',
    textAlign: 'center',
    backgroundColor: '#fdfff5',
    marginTop: '10vh',
    width: '25vh',
    height: 'auto',
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  const history = useHistory()
  const classes = useStyles();
  const { isLoggedIn } = useSelector(state => state.userReducer);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openAccountName, setOpenAccountName] = React.useState(false);
  const [openAccountAvatar, setOpenAccountAvatar] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const muiBaseTheme = createMuiTheme();
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const update = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  };
  window.addEventListener("resize", update);

  useEffect(() => {
    if (localStorage.getItem("hokogu_token")) {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(localStorage.getItem("hokogu_token")));
      dispatch(setName(localStorage.getItem("hokogu_token")));
      dispatch(setAvatar(localStorage.getItem("hokogu_token")));
    }
  }, [isLoggedIn]);
  

  // useEffect(()=>{
  //   update()
  // }, [])

  const doLogout = () => {
    dispatch(logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLoginDrawerOpen = () => {

    setOpenLogin(true)
  }

  const handleLoginDrawerClose = () => {
    setOpenLogin(false)
  }


  const toggleDrawer = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(value);
  };

  const toggleLoginDrawer = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenLogin(value);
  };


  const toggleAccountDrawerName = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenAccountName(value);
  };


  const toggleAccountDrawerAvatar = (value) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenAccountAvatar(value);
  };


  const handleClose = () => {
    handleLoginDrawerClose()
  }

  const handleFavOpen = () => {
    setOpen(false);
    if(isLoggedIn) {
      history.push('/favorites')
    }else{
      handleLoginDrawerOpen();
    }
  }
  

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // style={{width: 'auto'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar style={{ width: "100vw" }}>
          <div
            style={{
              display: "flex",
              padding: "5px",
              width: "100vw",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon style={{ fontSize: "50px" }} />
            </IconButton>

            { width * 1.35 > height &&
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src="/logo.png" height="50px"></img>
              </Link>
            </div>
            }

            {isLoggedIn && (
              <>
              <div
                style={{
                  textDecoration: "none"
                }}
                onClick={handleClickMenu}
                edge="end"
              >
                <>
                { localStorage.getItem('hokogu_avatar') === 'none' &&
                  <Avatar className='navbarAvatar' style={
                    {
                      height: '50px',
                      width: '50px',
                      fontSize: '25px',
                      backgroundImage:'linear-gradient(to right, #ffcbcb, #FF5F6D)'
                    }
                  }>
                    {localStorage.getItem('hokogu_name')[0].toUpperCase()}
                  </Avatar>
                }
                { localStorage.getItem('hokogu_avatar') !== 'none' &&
                  <Avatar 
                  className='navbarAvatar'
                  src={localStorage.getItem('hokogu_avatar')}
                  style={
                    {
                      height: '50px',
                      width: '50px',
                      fontSize: '25px',
                    }
                  }/>
                  
                }
                </>
              </div>
              <Menu
        id="simple-menu"
        style={{top: '55px'}}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={()=> {
            setOpenAccountName(true)
            handleCloseMenu();
          }
        }>Edit Name</MenuItem>
        <MenuItem onClick={()=> {
            setOpenAccountAvatar(true)
            handleCloseMenu();
          }
        }>Edit Avatar</MenuItem>

        <MenuItem onClick={()=> {
            handleCloseMenu();
            doLogout();
          }
        }>Logout</MenuItem>
      </Menu>



      <Drawer
        className={classes.drawer}
        anchor="top"
        open={openAccountName}
        onClose={toggleAccountDrawerName(false)}
        onOpen={toggleAccountDrawerName(true)}
        classes={{
          paper: classes.drawerPaperAccountName
        }}
      >
        <div>
          {/* <Avatar className='navbarAvatar' style={
            {
                margin: 'auto',
                height: '60px',
                width: '60px',
                fontSize: '30px',
                backgroundImage:'linear-gradient(to right, #ffcbcb, #FF5F6D)'
              }
            }>
              {localStorage.getItem('hokogu_name')[0].toUpperCase()}
          </Avatar> */}
          <h1> {localStorage.getItem('hokogu_name')} </h1>
        </div>
      </Drawer>
      <Drawer
        className={classes.drawer}
        anchor="top"
        open={openAccountAvatar}
        onClose={toggleAccountDrawerAvatar(false)}
        onOpen={toggleAccountDrawerAvatar(true)}
        classes={{
          paper: classes.drawerPaperAccountAvatar
        }}
      >
        <div>
          <Avatar className='navbarAvatar' style={
            {
                margin: 'auto',
                height: '60px',
                width: '60px',
                fontSize: '30px',
                backgroundImage:'linear-gradient(to right, #ffcbcb, #FF5F6D)'
              }
            }>
              {localStorage.getItem('hokogu_name')[0].toUpperCase()}
          </Avatar>
          {/* <h1> {localStorage.getItem('hokogu_name')} </h1> */}
        </div>
      </Drawer>


              </>
            )}
            {!isLoggedIn && (
              <div
                style={{
                  textDecoration: "none"
                  // justifyContent: 'flex-end'
                }}
                edge="end"
              >
                  {/* <Link  to='/login' style={{ textDecoration: 'none' }}> */}


                  <div onClick={handleLoginDrawerOpen}>
                      <MuiThemeProvider
                      theme={createMuiTheme({
                          typography: {
                          useNextVariants: true
                          },
                          overrides: GradientButton.getTheme(muiBaseTheme)
                      })}
                      >
                          <GradientButton words='Login'/>
                      </MuiThemeProvider>
                  {/* </Link> */}
                  </div>



              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{
          paper: classes.drawerPaper
        }}
      >

        <div className={classes.drawerHeader}>
        </div>
        <List>
            <Link onClick={handleDrawerClose} to='/' style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon> <HomeIcon style={{color:"#ff9687", fontSize: "40px"}}/> </ListItemIcon>
                    <ListItemText primary={'Home'} style={{color:"#ff9687", fontSize: "60px"}}/>
                </ListItem>
            </Link>
            <Link onClick={handleDrawerClose} to='/popular' style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon> <FavoriteIcon style={{color:"#ff9687", fontSize: "40px"}}/> </ListItemIcon>
                    <ListItemText primary={'Popular'} style={{color:"#ff9687", fontSize: "60px"}}/>
                </ListItem>
            </Link>
            <ListItem button onClick={handleFavOpen}>
              <ListItemIcon>
                {" "}
                <StarIcon style={{ color: "#ff9687", fontSize: "40px" }} />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"My Favourites"}
                style={{ color: "#ff9687", fontSize: "60px" }}
              />
            </ListItem>
        </List>
      </SwipeableDrawer>

      <Drawer
        className={classes.drawer}
        anchor="right"
        open={openLogin}
        onClose={toggleLoginDrawer(false)}
        onOpen={toggleLoginDrawer(true)}
        classes={{
          paper: classes.loginDrawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
        </div>
        <LoginForm handleClose={handleClose}/>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      ></main>
    </div>
    </>
  );
}
