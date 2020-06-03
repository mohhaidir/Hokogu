import React, { useEffect, useState } from 'react'
import { Grid, Button, Box, Divider } from '@material-ui/core';
import axios from 'axios'
import { CardIngredient } from '../components';
import { LocalDining, AccessTime, DoubleArrow } from '@material-ui/icons';
import { useStyles } from '../assets/css';
import { useParams, Link, useHistory } from 'react-router-dom'
import Ingredients from '../components/Ingredients'
import ExtendedFoodCard from '../components/ExtendedFoodCard'
import GroceryTable from '../components/GroceryTable'

const loading = false;

const groceryList = []

export default function GroceryList() {
    const history = useHistory()
    // const { id } = useParams()
    // const [groceryList, setGroceryList] = useState(null)
    // const [loading, setLoading] = useState(false)
    useEffect(() => {
        // setLoading(true)
        // axios({
        //     method: "get",
        //     url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=5cd43e21289d449988abacef7d29dd14`
        // })
        //     .then(response => {
        //         console.log(response)
        //         setRecipe(response.data)
        //         setLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }, [])

    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const update = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    };
    window.addEventListener("resize", update);
    
    // function goToStep(){
    //     history.push(`/step/${id}`)
    // }

    return (
        <div style={{ textAlign:'center', backgroundColor: 'white', height: '100%'}}>
        {/* {   width > 1000 && */}

            <div style={{
            backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '200px',
            paddingTop: '60px',
            textAlign: 'center'
            }}>
                    <h1 className='accountText'>
                        Grocery List
                    </h1>
            </div>
        {/* }

        {   width <= 1000 &&
            <div style={{
                backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '60px',
                paddingTop: '8px',
                paddingLeft: '10vw',
                paddingRight: '10vw',
                textAlign: 'center'
            }}>
            <h5 className='accountTextMini'>
                Grocery List
            </h5>
            </div>
        } */}
            <>
            {   loading &&
                    <div style={{textAlign:"center"}}>
                        <img height="300" width="300" src="/loading.gif" alt="loading" />
                    </div>
            }
            
            {   (!loading && groceryList !== null) &&
                <div>
                    <GroceryTable/>
                </div>
            }
            </>
        </div>
    )
}