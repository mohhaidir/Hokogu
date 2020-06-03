import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: '100%',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
}));

const tileData = [
  {
    Name: "Chocolate Baklava",
    img:
      "https://i.pinimg.com/originals/21/13/5f/21135f8d66e04a00c9d337c0ce971954.jpg",
    id: 896626,
    featured: false
  },
  {
    Name: "Blueberry Crostata",
    img:
      "https://www.katiescucina.com/wp-content/uploads/2019/09/Blueberry-Crostata-Recipe.jpg",
    id: 1116348,
    featured: false
  },
  {
    Name: "Hawaiian Pork Burger",
    img:
      "https://www.rachaelraymag.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTQ1OTQ3NzMzODUxNjQ1NjQ1/hawaiian-pork-burgers-102439701.jpg",
    id: 245166,
    featured: false
  },
  {
    Name: "Nasi Goreng",
    img:
      "https://i0.wp.com/tastynesia.com/wp-content/uploads/2020/01/Resep-Nasi-Goreng-Kampung.jpg",
    id: 474266,
    featured: false
  },
  {
    Name: "Pumpkin Soup",
    img:
      "https://img.delicious.com.au/0Hfc6oZG/w1200/del/2017/03/creamy-pumpkin-soup-43936-2.jpg",
    id: 574574,
    featured: false
  },
  {
    Name: "Spaghetti Aglio e Olio",
    img:
      "https://www.vincenzosplate.com/wp-content/uploads/2020/03/spaghetti-aglio-olio-recipe.png",
    id: 260845,
    featured: false
  },
  {
    Name: "Beef Rendang",
    img:
      "https://omnivorescookbook.com/wp-content/uploads/2019/12/1911_Beef-Rendang_550.jpg",
    id: 200298,
    featured: false
  },
  {
    Name: "Ossobuco Alla Milanese",
    img:
      "https://www.sfizioso.it/wp-content/uploads/2017/10/Ossobuco-alla-milanese-teresa-balzano-e1509446833142.jpg",
    id: 1433623,
    featured: false
  }
];
export default function StaffPicksGrid() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <GridList cellHeight={200} spacing={1} className={classes.gridList}>
        {tileData.map((tile) => (
          <GridListTile onClick={() => history.push(`/recipe/${tile.id}`)} key={tile.img} cols={tile.featured ? 2 : 1} rows={tile.featured ? 2 : 1}>
            <img src={tile.img} alt={tile.Name} />
            <GridListTileBar
              title={tile.Name}
              titlePosition="top"
              className={classes.titleBar}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
