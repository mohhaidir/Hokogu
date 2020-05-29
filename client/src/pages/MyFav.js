import React from 'react';
import { Grid } from '@material-ui/core';
import { CardRecipe } from '../components/';

export default function MyFav() {
    return (
        <div className='mainContent'>
            <Grid container spacing={3} className='contentMostFav'>
                <Grid item xs={12} >
                    <h1>My Favorite</h1>
                    <hr></hr>
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
                        <CardRecipe/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}