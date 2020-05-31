import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Divider } from '@material-ui/core';
import axios from 'axios'
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { useParams, Link, useHistory } from 'react-router-dom'

export default function Detail() {
    const { id } = useParams()
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        axios({
            method: "get",
            url: `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=fd9f4d3bdf944da4add45901325004fe`
        })
            .then(response => {
                console.log(response.data.ingredients)
                setIngredients(response.data.ingredients)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <Box className='mainContent'>
            <br />
            <br />
            <br />
            <br />
            <br />

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
                            <img src='https://spoonacular.com/recipeImages/579247-556x370.jpg' className='responsive' />
                            <div className='detailImage'>
                                <LocalDining className='iconColor' />
                                2
                                <AccessTime className='iconColor' style={{ marginLeft: '8px' }} />
                                25 mins
                            </div>
                        </Grid>
                        <Grid item lg={9} sm={12}>
                            <h1>Ingredients</h1>
                            <Divider />
                            <Grid item container spacing={2} direction={'row'} style={{ marginTop: '20px' }}>
                                {ingredients.map((ingredient, idx) => {
                                    return (
                                        <CardIngredient key={idx} ingredient={ingredient} />
                                    )
                                })

                                }
                            </Grid>
                        </Grid>
                        <Grid item xs={12} className='buttonCooking'>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<DoubleArrow />}
                            >
                                Let's Cooking
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}