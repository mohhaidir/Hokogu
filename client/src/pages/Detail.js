import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Divider } from '@material-ui/core';
import axios from 'axios'
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { useParams, Link, useHistory } from 'react-router-dom'

export default function Detail(props) {
    const { id } = useParams()
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([])
    const [detailImage, setDetailImage] = useState('')
    const [detailServing, setDetailServing] = useState('')
    const [detailReady, setDetailReady] = useState('')
    const [detailName, setDetailName] = useState('')

    useEffect(() => {
        axios({
            method: "get",
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=fd9f4d3bdf944da4add45901325004fe`
        })
            .then(response => {
                setIngredients(response.data.extendedIngredients)
                setDetailImage(response.data.image)
                setDetailServing(response.data.servings)
                setDetailReady(response.data.readyInMinutes)
                setDetailName(response.data.title)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    console.log(props)
    return (
        <Box className='mainContent'>
            <br />
            <br />
            <br />
            <br />
            <br />

            <Grid container spacing={3} className='content'>
                <Grid item xs={12}>
                    <h1>{detailName}</h1>
                    <hr></hr>
                    <Grid item xs={12}
                        container
                        direction='row'
                        spacing={3}
                        alignItems='center'
                        className='noMargin'
                    >
                        <Grid item lg={3} sm={12} className='imageFood'>
                            <img src={detailImage} className='responsive' />
                            <div className='detailImage'>
                                <LocalDining className='iconColor' />
                                {detailServing}
                                <AccessTime className='iconColor' style={{ marginLeft: '8px' }} />
                                {detailReady}
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