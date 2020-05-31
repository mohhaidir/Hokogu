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

    // let favouritesLoading = false;

//     let favourites = [
//     {
//         "id": 535835,
//         "title": "Spaghetti Carbonara",
//         "readyInMinutes": 25,
//         "servings": 4,
//         "sourceUrl": "http://DAMNDELICIOUS.NET/2014/03/29/spaghetti-carbonara/",
//         "openLicense": 0,
//         "image": "Spaghetti-Carbonara-535835.jpg"
//     },
//     {
//         "id": 249325,
//         "title": "Chili Tortellini",
//         "readyInMinutes": 45,
//         "servings": 10,
//         "sourceUrl": "http://picky-palate.com/2013/04/10/chili-tortellini/",
//         "openLicense": 0,
//         "image": "Chili-Tortellini-249325.jpg"
//     },
//     {
//         "id": 718828,
//         "title": "21 Day Fix Broccoli Mac & Cheese (AKA the perfect Mac & Cheese)",
//         "readyInMinutes": 45,
//         "servings": 8,
//         "sourceUrl": "http://thefoodieandthefix.com/21-day-fix-broccoli-mac-cheese-aka-the-perfect-mac-cheese/",
//         "openLicense": 0,
//         "image": "21-day-fix-broccoli-mac-cheese-(aka-the-perfect-mac-cheese)-718828.jpg"
//     }
// ]


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

        {   (favouritesLoading === false && favourites.length > 0 )  &&
            <div className="wrapper">
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
                        <div key={idx}>
                        <FoodCard recipe={modified}/>
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
