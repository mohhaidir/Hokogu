import React from 'react';
import { Grid } from '@material-ui/core';
import { CardIngredient } from '../components';
import { LocalDining, AccessTime } from '@material-ui/icons';

export default function Detail() {
    return (
        <div className='mainContent'>
            <Grid container spacing={3} className='content'>
                <Grid item xs={12} >
                    <h1>Nasi Goreng</h1>
                    <hr></hr>
                    <Grid item xs={12} 
                        container 
                        direction='row' 
                        spacing={3} 
                        alignItems='center' 
                        className='noMargin'
                    >
                        <Grid item lg={3} sm={12} className='imageFood'>
                            <img src='https://spoonacular.com/recipeImages/579247-556x370.jpg' className='responsive'/>
                            <div className='detailImage'>
                                <LocalDining className='iconColor'/>
                                2
                                <AccessTime className='iconColor' style={{marginLeft:'8px'}}/>
                                25 mins
                            </div>
                        </Grid>
                        <Grid item lg={9} sm={12}>
                                <h1>Ingredients</h1>
                            <Grid item container spacing={2} direction={'row'}>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                                <CardIngredient/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}