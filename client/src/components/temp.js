import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over'
import { Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core/';
import { LocalDining, Favorite, AccessTime } from '@material-ui/icons';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import GradientButton from '../components/GradientButton'


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
  media: {
    width: '30%',
    marginLeft: 'auto',
    marginRight: '25px',
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
    const muiBaseTheme = createMuiTheme();

    if(props.recipe.title.length > 30){
        props.recipe.title = props.recipe.title.substring(0, 27) + '...';
    }
  const styles = useStyles();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();
  function addFavoritesAction () {
    console.log('action add to fav')
}

  return (
    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        className={styles.media}
        image={
          `https://spoonacular.com/recipeImages/${props.recipe.image}`
        }
      />
      
      <CardContent style={{minWidth: '200px'}}>



        <TextInfoContent
          classes={contentStyles}
          overline={'28 MAR 2019'}
          heading={'What is Git ?'}
          body={
            'Git is a distributed version control system. Every dev has a working copy of the code and...'
          }
        />
        {/* <Button  className={buttonStyles}>See Details</Button> */}
        <div>
            <MuiThemeProvider
            theme={createMuiTheme({
            typography: {
            useNextVariants: true
            },
            overrides: GradientButton.getTheme(muiBaseTheme)
            })}
            >
            <br/>
            <GradientButton  words='Show Details'/>
            </MuiThemeProvider>
        </div>

      </CardContent>
    </Card>
  );
};


export default FoodCard;