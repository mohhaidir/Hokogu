import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {Button} from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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


const drawerWidth = 360;

  
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    // marginLeft: '30px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    backgroundColor: '#fdfff5',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
//   appBarShift: {
//     width: `calc(100%)`,
//     marginLeft: '0',
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
  menuButton: {
    color: '#ff9687',
    marginRight: theme.spacing(2),
  },
//   hide: {
//     display: 'none',
//   },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: '#fdfff5',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: -drawerWidth,
//   },
//   contentShift: {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const muiBaseTheme = createMuiTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar  style={{padding:"10px", width:'100%'}}>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon style={{fontSize: "50px"}} />
            </IconButton>
            <Link  to='/' style={{ textDecoration: 'none', marginLeft: "35%" }}>

            <img  src="./logo.png" height="60px"></img>
            </Link>

            <div style={{marginLeft: "35%"}} justifyContent="flex-end" >
            <Link  to='/login' style={{ textDecoration: 'none' }}>
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
            </Link>
            </div>
        </Toolbar>

      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
            <Link onClick={handleDrawerClose} to='/' style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon> <HomeIcon style={{color:"#ff9687", fontSize: "40px"}}/> </ListItemIcon>
                    <ListItemText primary={'Home'} style={{color:"#ff9687", fontSize: "60px"}}/>
                </ListItem>
            </Link >
            <Link onClick={handleDrawerClose} to='/favorites' style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon> <StarIcon style={{color:"#ff9687", fontSize: "40px"}}/> </ListItemIcon>
                    <ListItemText primary={'Favourites'} style={{color:"#ff9687", fontSize: "60px"}}/>
                </ListItem>
            </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >

      </main>
    </div>
  );
}
