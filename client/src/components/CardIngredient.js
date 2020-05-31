import React from 'react';
import { Grid, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core';
import { useStyles } from '../assets/css';

export default function CardIngredient(props) {
    const classes = useStyles();

    return (
        <Grid item lg={2} md={3} xs={6}>
            <CardActionArea className='cardIngredient'>
                <CardMedia
                    className={classes.media}
                    component="img"
                    src={`https://spoonacular.com/cdn/ingredients_250x250/${props.ingredient.image}`}
                    title="Bumbu"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.ingredient.amount.metric.value} {props.ingredient.amount.metric.unit}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.ingredient.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Grid>
    )
}