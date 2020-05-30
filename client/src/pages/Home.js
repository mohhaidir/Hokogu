import React from 'react';
import ReactDOM from "react-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LargeGradientButton from '../components/LargeGardientButton'
import Drawer from '@material-ui/core/Drawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      // marginLeft: '30px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.01), 0 3px 6px rgba(0,0,0,0.23)',
      backgroundColor: '#fdfff5',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      color: '#ff9687',
      // marginRight: theme.spacing(2),
    },
    drawer: {
      width: '100vw',
      flexShrink: 0,
      display: 'flex'
    },
    drawerPaper: {
        display: 'flex',
        backgroundColor: '#fdfff5',
        width: '100vw',
        height: '150px',
        display: 'flex'
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  }));
  


export default function Home() {
    const muiBaseTheme = createMuiTheme();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    
    return (
        <>
        <Drawer
        // className={classes.drawer}
        anchor="top"
        open={open == true}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
            <div style={{display: 'flex', padding: '7px'}}>
                <IconButton onClick={handleDrawerClose}>
                    <HighlightOffIcon style={{fontSize: "40px"}}/>
                </IconButton>
                <h2>search</h2>

            </div>

        </Drawer>


        <div style={{
        backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '70vh',
        padding: '400px',
        paddingTop: '100px',
        textAlign: 'center'
        }}>
            <h1 className='homeSlogan' style={{textAlign: 'center'}}>
                    Nothing brings people together like good food
            </h1>
            <div
            onClick={handleDrawerOpen} >
            <MuiThemeProvider
            theme={createMuiTheme({
            typography: {
            useNextVariants: true
            },
            overrides: LargeGradientButton.getTheme(muiBaseTheme)
            })}
            >
            <br/>

            <LargeGradientButton  words='Find Recipes'/>
            </MuiThemeProvider>
            </div>

        </div>
        </>
    )
}