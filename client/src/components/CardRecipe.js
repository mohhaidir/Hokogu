import React, { useState, useEffect } from 'react'
import { useStyles } from '../assets/css';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core/';
import { LocalDining, Favorite, AccessTime } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function CardRecipe(props) {
    const [isFav,setIsFav] = useState(props.isFav)
    const classes = useStyles();

    function addFavoritesAction() {      
        if(isFav){
            axios({
                method: "delete",
                url: `${host}/favorites/${props.myFavorite.id}`,
                headers: { token: localStorage.getItem('token') }
            })
                .then(response => {
                    setBulkPosts(response.data)
                    setPostLoading(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <Grid item lg={3} sm={12}>
            <Link to='/detail' className='cardContent'>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={props.myFavorite.image}
                        title="Nasi Goreng"
                    />
                    <CardContent className='titleCard'>
                        <h2>{props.myFavorite.title}</h2>
                    </CardContent>
                    <CardActions disableSpacing className='bottomCard'>
                        <IconButton aria-label="add to favorites" onClick={addFavoritesAction}>
                        {isFav ? <Favorite className='iconColor' /> : <Favorite />}                 
                        </IconButton>
                        {/* <LocalDining /> */}
                        {props.myFavorite.serving}
                        <AccessTime style={{ marginLeft: '8px' }} />
                        {props.myFavorite.ready} mins
                    </CardActions>
                </Card>
            </Link>
        </Grid>
    )
}