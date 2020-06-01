import React,{useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useSelector,useDispatch} from 'react-redux'
import {setIsLoggedIn, setToken, setName, setAvatar} from '../store/actions/userActions'

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LargeGradientButton from '../components/LargeGardientButton'
import Drawer from '@material-ui/core/Drawer';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import StaffPicks from '../components/StaffPicks'
import SearchIcon from '@material-ui/icons/Search';
import { Mic as MicIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      // marginLeft: '30px',
      textAlign: 'center',
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
        textAlign: 'center',
      width: '100vw',
      flexShrink: 0,
      display: 'flex'
    },
    drawerPaper: {
        textAlign: 'center',
        margin: 'auto',
        marginTop: '30px',
        display: 'flex',
        backgroundColor: '#fdfff5',
        width: '90vw',
        height: '75px',
        display: 'flex',
        borderRadius: '50px'
        // borderBottomLeftRadius: '20px',
        // borderBottomRightRadius: '20px'

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
    const dispatch = useDispatch()
    const { isLoggedIn} = useSelector(state => state.userReducer);
    const history = useHistory()
    const muiBaseTheme = createMuiTheme();
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isOnListening, setIsOnListening] = useState(false);

    useEffect(()=> {
      if(localStorage.getItem('hokugo_token')){
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(localStorage.getItem('hokugo_token')));
          dispatch(setName(localStorage.getItem('hokugo_name')));
          dispatch(setAvatar(localStorage.getItem('hokugo_avatar')));
      }
    }, [isLoggedIn])
  
    const handleDrawerOpen = () => {
        speechToText();
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);    
    };

    const handleQuery = (value) => {
        setQuery(value);
    }

    const search = (e) => {
        e.preventDefault();
        if(query !== ''){
            history.push(`/search?query=${query}`)
        }
    }

    function speechToText() {
      // speech recognition API supported
      var SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
      var recognition = new SpeechRecognition(); 
      // This will run when the speech recognition service returns a result
      recognition.onstart = function() {
          console.log("Voice recognition started. Try speaking into the microphone.");
          setIsOnListening(true);
      };
      
      recognition.onresult = function(event) {
          setIsOnListening(false);
          var transcript = event.results[0][0].transcript;
          if (query !== '' || query !== undefined || query !== null) {
            setQuery(transcript);
            console.log('querrry', query)
            if(transcript !== ''){
              history.push(`/search?query=${transcript}`)
            }
          }
      };
      
      // start recognition
      recognition.start();
    }

    useEffect(()=> {
      if(localStorage.getItem('hokugo_token')){
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(localStorage.getItem('hokugo_token')));
          dispatch(setName(localStorage.getItem('hokugo_name')));
          dispatch(setAvatar(localStorage.getItem('hokugo_avatar')));
      }
    }, [isLoggedIn])
  

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
            <div style={{display: 'flex', padding: '7px', textAlign: 'center'}}>
            <IconButton>
            {isOnListening ? 
            <MicIcon style={{fontSize: "40px"}} className='iconColor'/>
            :
            <MicIcon style={{fontSize: "40px"}} />  
            }
            </IconButton>

                <form className='searchForm' onSubmit={search}>
                    <input 
                    autoFocus 
                    value={query}
                    onChange={(e)=>handleQuery(e.target.value)}
                    placeholder='what are you craving...' 
                    className='searchInput' 
                    type="text"/>
                </form>
                {/* <IconButton onClick={speechToText}> */}
                <IconButton onClick={handleDrawerClose}>
                    <HighlightOffIcon style={{fontSize: "40px"}}/>
                </IconButton>
            </div>
        </Drawer>

        
        <div className='bannerHome'>
            <h1 className='homeSlogan'>
                    Nothing brings people together like good food
            </h1>
            <div
            style={{marginTop: '100px'}}
            onClick={handleDrawerOpen} >
            <MuiThemeProvider
            theme={createMuiTheme({
            typography: {
            useNextVariants: true
            },
            overrides: LargeGradientButton.getTheme(muiBaseTheme)
            })}
            >
            <LargeGradientButton  words='Find Recipes'/>
            </MuiThemeProvider>
            </div>
        </div>


        <div style={{padding: "40px 100px", backgroundColor: "#fdfff5"}}>
            <h1 style={{color: '#fd515c', fontSize: '40px', textAlign: 'center'}}>Staff Picks</h1>
            <StaffPicks/>
            <br/>
            <br/>
            <br/>
        </div>


        </>
    )
}