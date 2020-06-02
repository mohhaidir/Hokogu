import React, {useState} from 'react';
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
    // overflowX: 'auto',
  },
}));

let id = 0;
function createData(name, fat, price) {
  id += 1;
  return { id, name, fat, price };
}


const Ingredients = (props) => {
  const classes = useStyles();
  const cardHeaderStyles = useContainedCardHeaderStyles();
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true });
  const cardHeaderShadowStyles = useFadedShadowStyles();
  const ingredients = props.ingredients
  const [height, setHeight] = useState(window.innerHeight)
  const [width, setWidth] = useState(window.innerWidth)
  const update = () => {
    setHeight(window.innerHeight)
    setWidth(window.innerWidth)
  };
  window.addEventListener("resize", update);

  return (
    <div className='detailIngredient'>
      <Card
      className={cx(classes.card, cardShadowStyles.root)}>
          <br/>
          <CardHeader
              style={{backgroundImage: 'linear-gradient(to right, #ffcbcb, #FF5F6D)'}}
              className={cardHeaderShadowStyles.root}
              classes={cardHeaderStyles}
              title={'Ingredients'}
          >
          </CardHeader>
          <CardContent className={classes.content}
              style={{
                  // width: "100%",
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

                  {/* <TableCell align="right"> Ammount </TableCell> */}
                  </TableRow>
              </TableHead>
              <TableBody className='IngredientBody' 
              >
                  {ingredients.map(ingredient => (
                  <TableRow key={ingredient.id}>
                      <TableCell align="center" component="th" scope="row">
                      <>
                      <Avatar alt="Remy Sharp" src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} />
                      </>
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
                  </TableRow>
                  ))}
              </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
  );
};


export default Ingredients;