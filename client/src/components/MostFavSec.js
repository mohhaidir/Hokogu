import React from 'react';
import { Grid } from '@material-ui/core';
import { CardRecipe } from '../components/';

export default function MostFavSec() {

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <h1>Most Favorite</h1>
                <hr/>
                <Grid item xs={12} 
                    container 
                    direction='row' 
                    spacing={3} 
                    alignItems='center' 
                    className='noMargin'
                >
                    <CardRecipe/>
                    <CardRecipe/>
                    <CardRecipe/>
                    <CardRecipe/>
                    <CardRecipe/>
                    <CardRecipe/>
                    <CardRecipe/>
                </Grid>
            </Grid>
        </Grid>
    )
}