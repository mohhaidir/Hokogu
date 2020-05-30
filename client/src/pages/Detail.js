import React from 'react';
import { Grid, Button, Box, Divider } from '@material-ui/core';
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { Link } from 'react-router-dom';

export default function Detail() {
    const classes = useStyles();

    return (
        <Box className='mainContent'>
            <Grid container spacing={3} className='content'>
                <Grid item xs={12}>
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
                            <Divider/>
                            <Grid item container spacing={2} direction={'row'} style={{marginTop:'20px'}}>
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
                        <Grid item xs={12} className='buttonCooking'>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DoubleArrow />}
                            >
                                <Link to='/step'>
                                    Let's Cooking
                                </Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}