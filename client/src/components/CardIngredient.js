import React from 'react';
import { Grid, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useStyles } from '../assets/css';

export default function CardIngredient() {
    const classes = useStyles();

    return (
        <Grid item lg={2} md={3} xs={6}>
            <CardActionArea className='cardIngredient'>
                <CardMedia
                className={classes.media}
                component="img"
                src='https://spoonacular.com/cdn/ingredients_250x250/blueberries.jpg'
                title="Bumbu"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    222.0 g
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                    blueberries
                </Typography>
                </CardContent>
            </CardActionArea>
        </Grid>
    )
}