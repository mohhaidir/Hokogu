import React, {useEffect, useState} from 'react'
import FoodCard from '../components/FoodCard'
import { useSelector, useDispatch} from "react-redux";
import { getFavourites } from "../store/actions/favouritesActions";
import { Grid } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'


const MyFav = () => {
    const dispatch = useDispatch();
    let favourites = useSelector((state)=> state.favouritesReducer.favourites);
    let favouritesLoading = useSelector((state)=> state.favouritesReducer.favouritesLoading);
    const history = useHistory()

    useEffect(()=>{
        dispatch(getFavourites());
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
                My Favourites
            </h1>
        </div>

        <br/>
        {   favouritesLoading  && 
            <div style={{textAlign:"center"}}>
            <img height="300" width="300" src="loading.gif" alt="loading" />
            </div>
        }

        {   (!favouritesLoading && favourites.length > 0 )  &&
            <div className="wrapper">
            {   
                favourites.map((recipe, idx) => {
                    return(
                        <div key={idx}>
                        <FoodCard recipe={recipe}/>
                        </div>
                    )
                })
            }
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
export default MyFav;
