import React, { useState, useEffect } from 'react'
import { useStyles } from '../assets/css';
import { Grid, Card, CardMedia, CardContent, CardActions, IconButton } from '@material-ui/core/';
import { LocalDining, Favorite, AccessTime } from '@material-ui/icons';
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from "axios";
import {hostingUrl} from "../host"

export default function CardRecipe(props) {
    const host = hostingUrl
    const [isFav, setIsFav] = useState(props.isFav)
    const classes = useStyles();
    const history = useHistory()

    function addFavoritesAction() {
        if (isFav) {
            axios({
                method: "delete",
                url: `${host}/favorites/${props.myFavorite.id}`,
                headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJicmFtQGdtYWlsLmNvbSIsImlhdCI6MTU5MDc0NzE3Nn0.TIg04-PeRdcsbysDHBXD_oyHFQJkLuOueWtD1vK_ydo" }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            axios({
                method: "post",
                url: `${host}/favorites`,
                data: {
                    recipeId: props.myFavorite.recipeId,
                    title: props.myFavorite.title,
                    ready: props.myFavorite.ready,
                    serving: props.myFavorite.serving,
                    image: props.myFavorite.image,
                },
                headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJicmFtQGdtYWlsLmNvbSIsImlhdCI6MTU5MDc0NzE3Nn0.TIg04-PeRdcsbysDHBXD_oyHFQJkLuOueWtD1vK_ydo" }
            })
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function goToDetail(){
        history.push(`/detail/${props.myFavorite.recipeId}`)
    }

    return (
        <Grid item lg={3} sm={12}>
            {/* <Link to='/detail' className='cardContent'> */}
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        src={props.myFavorite.image}
                        title={props.myFavorite.title}
                        onClick={goToDetail}
                    />
                    <CardContent className='titleCard'>
                        <h2>{props.myFavorite.title}</h2>
                    </CardContent>
                    <CardActions disableSpacing className='bottomCard'>
                        <IconButton aria-label="add to favorites" onClick={addFavoritesAction}>
                            {isFav ? <Favorite className='iconColor' /> : <Favorite />}
                        </IconButton>
                        <LocalDining />
                        {props.myFavorite.serving}
                        <AccessTime style={{ marginLeft: '8px' }} />
                        {props.myFavorite.ready} mins
                    </CardActions>
                </Card>
            {/* </Link> */}
        </Grid>
    )
}