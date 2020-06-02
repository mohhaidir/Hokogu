import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Divider } from '@material-ui/core';
import axios from 'axios'
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { useParams, Link, useHistory } from 'react-router-dom'
import Ingredients from '../components/Ingredients'
import ExtendedFoodCard from '../components/ExtendedFoodCard'
export default function Detail() {
    const history = useHistory()
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios({
            method: "get",
            url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=fd9f4d3bdf944da4add45901325004fe`
        })
            .then(response => {
                console.log(response)
                setRecipe(response.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    
    function goToStep(){
        history.push(`/step/${id}`)
    }

    return (
        <div style={{ textAlign:'center', backgroundColor: 'white', minHeight: '90vh'}}>
            <>
            {   loading &&
                    <div style={{textAlign:"center"}}>
                        <img height="300" width="300" src="/loading.gif" alt="loading" />
                    </div>
            }
            
            {   (!loading && recipe !== null) &&
                <div>
                <div style={{
                backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                // height: '100px',
                paddingTop: '8px',
                paddingLeft: '10vw',
                paddingRight: '10vw',
                textAlign: 'center'
                }}>
                    <h1 className='accountText'>
                        {recipe.title}
                    </h1>
                </div>
                <br/>
                <div style={{paddingLeft: '10vw', paddingRight: '10vw'}}>
                    <ExtendedFoodCard recipe={recipe} />
                    <br/>
                </div>
                </div>
            }
            </>
        </div>
    )
}