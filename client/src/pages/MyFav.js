import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Grid } from '@material-ui/core';
import { CardRecipe } from '../components/';

export default function MyFav() {

    const host = 'http://localhost:3000'
    const [myFavorites, setMyFavorites] = useState([])
    const [myFavoritesLoading, setMyFavoritesLoading] = useState(true)

    useEffect(() => {
        axios ({
            method: "get",
            url: `${host}/favorites`,
            headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJicmFtQGdtYWlsLmNvbSIsImlhdCI6MTU5MDc0NzE3Nn0.TIg04-PeRdcsbysDHBXD_oyHFQJkLuOueWtD1vK_ydo" }
        })
        .then(response => {
            console.log(response.data)
            setMyFavorites(response.data.favorites)
            setMyFavoritesLoading(false)
        })
        .catch(err => {
            console.log(err)
        })
    }, [myFavorites])

    if (myFavoritesLoading){
        return (
            <>
            <h1>loading...</h1>
            <h1>loading...</h1>
            <h1>loading...</h1>
            <h1>loading...</h1>
            <h1>loading...</h1>
            <h1>loading...</h1> 
            </>
        )
    }

    return (
        <div className='mainContent'>
            <Grid container spacing={3} className='content'>
                <Grid item xs={12} >
                    <h1>My Favorite</h1>
                    <hr></hr>
                    <Grid item xs={12} 
                        container 
                        direction='row' 
                        spacing={3} 
                        alignItems='center' 
                        className='noMargin limitScroll'
                    >
                        {myFavorites.map((myFavorite) => {
                            return (
                                <CardRecipe key={myFavorite.id} myFavorite={myFavorite} isFav={true} />
                            )
                        })}

                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}