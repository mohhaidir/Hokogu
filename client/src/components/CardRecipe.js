import React from 'react';
import { useStyles } from '../assets/css';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core/';
import { LocalDining, Favorite, AccessTime } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function CardRecipe() {
    const classes = useStyles();

    function addFavoritesAction () {
        console.log('action add to fav')
    }
    
    return (
        <Grid item lg={3} sm={12}>
            <Link to='/detail' className='cardContent'>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src='https://spoonacular.com/recipeImages/579247-556x370.jpg'
                        title="Nasi Goreng"
                    />
                    <CardContent className='titleCard'>
                        <h2>Nasi Goreng</h2>
                    </CardContent>
                    <CardActions disableSpacing className='bottomCard'>
                        <IconButton aria-label="add to favorites" onClick={addFavoritesAction}>
                            {/* <Favorite className='iconColor'/> */}
                            <Favorite />
                        </IconButton>
                        <LocalDining/>
                        2
                        <AccessTime style={{marginLeft:'8px'}}/>
                        25 mins
                    </CardActions>
                </Card>
            </Link>
        </Grid>
    )
}