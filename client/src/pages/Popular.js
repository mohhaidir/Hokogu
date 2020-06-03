import React, {useEffect, useState} from 'react'
import FoodCard from '../components/FoodCard'
import { useSelector, useDispatch} from "react-redux";
import { getPopularRecipies } from "../store/actions/favouritesActions";
import { Grid } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'


const Popular = () => {
    const dispatch = useDispatch();

    let favourites = useSelector((state)=> state.favouritesReducer.popular);
    let favouritesLoading = useSelector((state)=> state.favouritesReducer.popularLoading);
    const history = useHistory()

    useEffect(()=>{
        dispatch(getPopularRecipies());
    }, [])

    
    return (
        <div style={{backgroundColor: 'white', minHeight: '100vh'}}> 
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
                Popular Recipies
            </h1>
        </div>

        <br/>
        <br/>
        <br/>


        {   favouritesLoading  && 
            <div style={{textAlign:"center"}}>
                <img height="300" width="300" src="/loading.gif" alt="loading" />
            </div>
        }

        {   (favouritesLoading === false && favourites.length > 0 )  &&
            // <div className="wrapper">
            <div style={{padding: '0px 9%'}}> 

            <Grid container lg={12} spacing={3} className={'resultSearch'}>

            {
                favourites.map((recipe, idx) => {
                    let modified = {
                        id: recipe.recipeId,
                        title: recipe.title,
                        readyInMinutes: recipe.ready,
                        servings: recipe.serving,
                        image: recipe.image
                    }
                    return(
                        <Grid item lg={6} sm={12} className={'resultDetail'}>

                        <div key={idx}>
                        <FoodCard recipe={modified}/>
                        </div>
                        </Grid>

                    )
                })
            }
            </Grid>

            </div>
        }
        {   (!favouritesLoading && favourites.length < 1) &&
            <h1>Your Favourites Are Empty</h1>
        }

        <br/>
        <br/>
        <br/>

        </div>
    )
}
export default Popular;
