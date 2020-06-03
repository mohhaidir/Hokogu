import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux'
import { setIsLoggedIn, setToken, setName, setAvatar } from '../store/actions/userActions'
import LargeGradientButton from '../components/LargeGardientButton'
import StaffPicks from '../components/StaffPicks'
import { SwipeableDrawer, IconButton } from '@material-ui/core/';
import { Mic as MicIcon, Search as SearchIcon } from '@material-ui/icons';

import Chip from '@material-ui/core/Chip';

const useChipStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    drawer: {
        textAlign: 'center',
      width: '100vw',
      flexShrink: 0,
      display: 'flex'
    },
    drawerPaperMobile: {
        textAlign: 'center',
        margin: 'auto',
        marginTop: '70px',
        display: 'flex',
        backgroundColor: '#fdfff5',
        width: '97vw',
        height: 'auto',
        display: 'flex',
        borderRadius: '30px'
        // borderBottomLeftRadius: '20px',
        // borderBottomRightRadius: '20px'
    },
    drawerPaper: {
      textAlign: 'center',
      margin: 'auto',
      marginTop: '40px',
      display: 'flex',
      backgroundColor: '#fdfff5',
      width: '95vw',
      height: '250px',
      display: 'flex',
      borderRadius: '30px'
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
    const chipClasses = useChipStyles();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [showReccomendations, setShowReccomendations] = useState(false);
    const [isOnListening, setIsOnListening] = useState(false);
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const update = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    };
    window.addEventListener("resize", update);
    
    const popularSearch = [
      'nasi goreng', 'pasta', 'pancake', 'sushi', 'burger', 'rendang', 'tom yum', 'fried chicken', 'lasagna', 'gyoza', 'apple tart', 'baklava'
    ]

    useEffect(()=> {
      if(localStorage.getItem('hokugo_token')){
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(localStorage.getItem('hokugo_token')));
          dispatch(setName(localStorage.getItem('hokugo_name')));
          dispatch(setAvatar(localStorage.getItem('hokugo_avatar')));
      }
    }, [isLoggedIn])
  
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);    
        setIsOnListening(false);
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

    const toggleDrawer = (value) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      if(value == false){
        setIsOnListening(false);
      }
  
      setOpen(value);
    };

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
        <SwipeableDrawer
        // className={classes.drawer}
        anchor="top"
        open={open == true}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}

        classes={{
          paper: classes.drawerPaper,
        }}
        >
            <div style={{display: 'flex', padding: '7px', textAlign: 'center', border: '2px solid black;'}}>
            <SearchIcon style={{fontSize: "40px", margin: '8px', color: 'gray'}}/>
                <form className='searchForm' onSubmit={search}>
                    <input 
                    autoFocus 
                    onFocus={()=> setShowReccomendations(true)}
                    value={query}
                    onChange={(e)=>handleQuery(e.target.value)}
                    placeholder='what are you craving...' 
                    className='searchInput' 
                    type="text"
                    />
                </form>
                <IconButton onClick={speechToText}>
                  {isOnListening ? 
                  <MicIcon style={{fontSize: "40px"}} className='iconColor'/>
                  :
                  <MicIcon style={{fontSize: "40px"}} />  
                  }
                </IconButton>
            </div>
            <div style={
              {
                display:'flex',
                flexWrap: 'wrap',
                paddingRight: '20px',
                paddingLeft: '20px',
                overflow:"auto",
                width: '100%'
              }
            }>
                {popularSearch.map((item, idx)=>{
                  return (
                    <Chip
                    onClick ={()=> history.push(`/search?query=${item}`)}
                    label={item}
                    clickable
                    style={{
                      marginRight: '10px',
                      marginBottom: '10px'
                    }}
                  />
            
                  )
                })
                }
            </div>

        </SwipeableDrawer>
        { height > width &&
        <div className='bannerHome'>
            <h1 className='homeSlogan'>
                    Nothing brings people together like good food
            </h1>
            <div
            style={{marginTop: '2vh'}}
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
        }
        { height <= width &&
        <div className='bannerHomeWeb'>
            <h1 className='homeSlogan'>
                    Nothing brings people together like good food
            </h1>
            <div
            style={{marginTop: '2vh'}}
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
        }


        <div style={{padding: "5vh", backgroundColor: "#fdfff5"}}>
            <StaffPicks/>
            <br/>
            <br/>
            <br/>
        </div>

        </>
    )
}