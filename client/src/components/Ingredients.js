import React, {useState, useEffect} from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';

import LoginForm from './LoginForm'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useDispatch, useSelector} from 'react-redux'
import { addToGroceries, getGroceries, setGroceries, removeFromGroceries } from "../store/actions/groceryAction";

const useStyles = makeStyles(({ spacing }) => ({
  card: {
    marginTop: 20,
    // marginRight: 20,
    borderRadius: spacing(0.5),
    transition: '0.3s',
    width: '100%',
    overflow: 'initial',
    background: '#ffffff',
  },
  content: {
    textAlign: 'left',
    overflowX: 'auto',
  },
}));

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



// let id = 0;
// function createData(name, fat, price) {
//   id += 1;
//   return { id, name, fat, price };
// }


const Ingredients = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  const ingredients = props.ingredients

  const { isLoggedIn } = useSelector(state => state.userReducer);
  const {groceries, groceriesLoading} = useSelector(state => state.groceryReducer);
  const [openLogin, setOpenLogin] = useState(false);

  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const update = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  };
  window.addEventListener("resize", update);

  useEffect(()=> {
    dispatch(getGroceries())
  },[])



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


  const addToGro = (ingredient) => {
    if(isLoggedIn){
      let data = {
        title: ingredient.name,
        image: ingredient.image,
        type: ingredient.aisle,
        status: 0
      }
      let temp = groceries;
      temp.push(data);
      dispatch(setGroceries(temp));
      dispatch(addToGroceries(data));
    }else{
      handleLoginDrawerOpen();
    }
  }
  
  const removeFromGro = (ingredient) => {
    if(isLoggedIn){
      let temp = []
      let title;
      let found = false
      for(let i=0; i<groceries.length; i++){
        if(groceries[i].title !== ingredient.name){
          temp.push(groceries[i]);
        }else{
          found = true;
          title = groceries[i].title;
        }
      }
      if(found){
        dispatch(setGroceries(temp));
        dispatch(removeFromGroceries(title));
      }
    }
  }
  

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

    
    <div className='detailIngredient'>
      <Card
      className={cx(classes.card, cardShadowStyles.root)}>
          <br/>
          <CardHeader
              style={{backgroundImage: 'linear-gradient(to right, #ffcbcb, #FF5F6D)', fontFamily: "Noto Serif JP, serif"}}
              className={cardHeaderShadowStyles.root}
              classes={cardHeaderStyles}
              title={'Ingredients'}
          >
          </CardHeader>
          <CardContent className={classes.content}
              style={{
                  width: "100%",
                  height: "600px",
                  overflow:"scroll"}}
          >
              <Table>
              <TableHead className='IngredientHead'>
                  <TableRow>
                  <TableCell align="center" style={{fontWeight:'bold'}}></TableCell>
                  <TableCell align="center" style={{fontWeight:'bold'}}>Item</TableCell>
                  <TableCell align="center" style={{fontWeight:'bold'}}> Ammount </TableCell>
                  { width > 500 &&
                  <TableCell align="center" style={{fontWeight:'bold'}}> Type </TableCell>
                  }
                  <TableCell align="center" style={{fontWeight:'bold'}}> </TableCell>
                  {/* <TableCell align="right"> Ammount </TableCell> */}
                  </TableRow>
              </TableHead>
              <TableBody className='IngredientBody' 
              >
                  {ingredients.map(ingredient => (
                  <TableRow key={ingredient.id}>
                      <TableCell align="center" component="th" scope="row">
                      { width > 500 &&
                        <Avatar alt="Remy Sharp" src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} />
                      }
                      { width <= 500 &&
                      <>
                      <Avatar style={{height: '20px', width: '20px'}} alt="Remy Sharp" src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} />
                      </>
                      }

                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                      <>
                      {ingredient.name}
                      </>
                      </TableCell>

                      <TableCell align="center"> {`${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitShort}`}</TableCell>
                      { width > 500 &&
                        <TableCell align="center">{ingredient.aisle}</TableCell>
                      }

                      <TableCell align="center" component="th" scope="row">
                      <>
                      {  groceries.find(x=> x.title === ingredient.name) ?
                          <Avatar 
                          onClick={()=>removeFromGro(ingredient)} 
                          className='navbarAvatar' 
                          style={
                            {
                              height: '20px',
                              width: '20px',
                              fontSize: '14px',
                              fontColor: 'white',
                              backgroundImage:'linear-gradient(to right, #ffcbcb, #FF5F6D)'
                            }
                          }>
                            x
                          </Avatar>
                        : 
                          <Avatar 
                          onClick={()=>addToGro(ingredient)} 
                          className='navbarAvatar' 
                          style={
                            {
                              height: '20px',
                              width: '20px',
                              fontSize: '14px',
                              fontColor: 'white',
                              backgroundImage:'linear-gradient(to right, #bcf5c2, #aed4fc)'
                            }
                          }>
                            +
                          </Avatar>
                      }
                      </>
                      </TableCell>
                      </TableRow>
                  ))}
              </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
    </>
  );
};


export default Ingredients;