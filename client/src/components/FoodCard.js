import React, {useState} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core/';
import { LocalDining, Favorite, AccessTime } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import GradientButton from '../components/GradientButton'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import { useDispatch, useSelector} from 'react-redux'
import { addToFavourite, setFavourites, removeFromFavourite } from "../store/actions/favouritesActions";
import {Link, useHistory} from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import LoginForm from './LoginForm'

const useStyleDrawer = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  drawer: {
    width: 250,
    flexShrink: 0
  },
  loginDrawerPaper: {
    backgroundColor: '#fdfff5',
    width: '50vh',
  },

  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }
}));


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: 'auto',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: spacing(2),
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  // drawer: {
  //   width: 250,
  //   flexShrink: 0
  // },
  // loginDrawerPaper: {
  //   backgroundColor: '#fdfff5',
  //   width: '50vh',
  // },
  // drawerHeader: {
  //   display: "flex",
  //   alignItems: "center",
  //   padding: theme.spacing(0, 1),
  //   // necessary for content to be below app bar
  //   ...theme.mixins.toolbar
  // },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [breakpoints.up('md')]: {
      width: '100%',
      marginLeft: spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    //   backgroundImage: 'linear-gradient(147deg, #fe8a39 0%, #fd3838 74%)',
      borderRadius: spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
}));

const FoodCard = (props) => {
    const classes = useStyleDrawer();
    const history = useHistory();
    const dispatch = useDispatch();
    if(props.recipe.title.length > 23){
        props.recipe.title = props.recipe.title.substring(0, 20) + '...';
    }
    let favourites = useSelector((state)=> state.favouritesReducer.favourites);
    const { isLoggedIn } = useSelector(state => state.userReducer);

    const [fav, setFav] = useState(false)
    const [openLogin, setOpenLogin] = React.useState(false);


    const muiBaseTheme = createMuiTheme();


    const handleLoginDrawerOpen = () => {
      setOpenLogin(true)
    }
  
    const handleLoginDrawerClose = () => {
      setOpenLogin(false)
    }
  

    const toggleLoginDrawer = (value) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setOpenLogin(value);
    };
  
    const handleClose = () => {
      handleLoginDrawerClose()
    }
  
  
    const addToFav = () => {
      if(isLoggedIn){
        setFav(true);
        let data = {
          recipeId: props.recipe.id,
          title: props.recipe.title,
          ready: props.recipe.readyInMinutes,
          serving: props.recipe.servings,
          image: props.recipe.image
        }
        let temp = favourites;
        temp.push(data)
        dispatch(setFavourites(temp));
        dispatch(addToFavourite(data));
      }else{
        handleLoginDrawerOpen();
      }
    }
    const removeFromFav = () => {
        setFav(false);
        let temp = []
        let id;
        let found = false
        for(let i=0; i<favourites.length; i++){
          if(favourites[i].recipeId !== props.recipe.id){
            temp.push(favourites[i]);
          }else{
            found = true;
            id = favourites[i].recipeId;
          }
        }
        if(found){
          dispatch(setFavourites(temp));
          dispatch(removeFromFavourite(id));
        }
    }
    const getDetails = (id) => {
      history.push(`/recipe/${id}`)
    }
    const styles = useStyles();
    const {
        button: buttonStyles,
        ...contentStyles
    } = useBlogTextInfoContentStyles();
    const shadowStyles = useOverShadowStyles();
    return (
      <>
        <SwipeableDrawer
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
            {/* <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton> */}
          </div>
          <LoginForm handleClose={handleClose}/>
        </SwipeableDrawer>

        <Card className={cx(styles.root, shadowStyles.root)}>
            {/* {
                fav == true &&
                <StarIcon onClick={removeFromFav} className='topFav' style={{
                    zIndex: 99,
                    position: "absolute", top: "12px", right:"12px", left:"auto",
                    lineHeight: '50%', fontSize: "35px", marginBottom: '5px', color: '#FF5F6D'}}
                />
            } */}
            {   favourites.find(x=> x.recipeId === props.recipe.id || fav === true) ?
                <StarIcon onClick={removeFromFav} className='topFav'/>
                :
                <>
                <StarBorderIcon onClick={addToFav} className='topFav'/>
                </>
            }

        <CardMedia
            className={styles.media}
            image={
                `https://spoonacular.com/recipeImages/${props.recipe.image}`
            }
            />
        <CardContent>
            <h2 style={{top: '30px'}}>{props.recipe.title}</h2>
            <CardActions disableSpacing className='iconDetailsCard'>
                        <LocalDining/>
                        {props.recipe.servings}
                        <AccessTime style={{marginLeft:'8px'}}/>
                        {props.recipe.readyInMinutes} mins
            </CardActions>
            
            <p className='insibleText'> ................................................................</p>
            <div onClick={()=>getDetails(props.recipe.id)}>

                <MuiThemeProvider
                style={{marginLeft: '100px'}}
                theme={createMuiTheme({
                typography: {
                useNextVariants: true
                },
                overrides: GradientButton.getTheme(muiBaseTheme)
                })}
                >
                <br/>
                <GradientButton  words='Details'/>
                </MuiThemeProvider>
            </div>

        </CardContent>
        </Card>
      </>
    );
};

export default FoodCard;