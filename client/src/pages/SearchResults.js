import React, {useEffect, useState} from 'react'
import queryString from 'query-string';
import FoodCard from '../components/FoodCard'
import { useSelector, useDispatch} from "react-redux";
import { getRecipies } from "../store/actions/recipeActions";
import { getFavourites } from "../store/actions/favouritesActions";

import { Grid } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Mic as MicIcon } from '@material-ui/icons';


const SearchResults = ({ location }) => {
    const dispatch = useDispatch();

    // let recipies = useSelector((state)=> state.recipeReducer.recipies);

    const recipies =  [
            {
                "id": 535835,
                "title": "Spaghetti Carbonara",
                "readyInMinutes": 25,
                "servings": 4,
                "sourceUrl": "http://DAMNDELICIOUS.NET/2014/03/29/spaghetti-carbonara/",
                "openLicense": 0,
                "image": "Spaghetti-Carbonara-535835.jpg"
            },
            {
                "id": 249325,
                "title": "Chili Tortellini",
                "readyInMinutes": 45,
                "servings": 10,
                "sourceUrl": "http://picky-palate.com/2013/04/10/chili-tortellini/",
                "openLicense": 0,
                "image": "Chili-Tortellini-249325.jpg"
            },
            {
                "id": 666437,
                "title": "One Pot Wonder Tomato Basil Pasta",
                "readyInMinutes": 30,
                "servings": 6,
                "sourceUrl": "http://www.apronstringsblog.com/one-pot-wonder-tomato-basil-pasta-recipe/",
                "openLicense": 0,
                "image": "One-Pot-Wonder-Tomato-Basil-Pasta-666437.jpg"
            },
            {
                "id": 491786,
                "title": "Ranch BLT Pasta Salad",
                "readyInMinutes": 45,
                "servings": 8,
                "sourceUrl": "http://www.cinnamonspiceandeverythingnice.com/ranch-blt-pasta-salad/",
                "openLicense": 0,
                "image": "Ranch-BLT-Pasta-Salad-491786.jpg"
            },
            {
                "id": 558057,
                "title": "Copycat Panera Macaroni and Cheese",
                "readyInMinutes": 25,
                "servings": 8,
                "sourceUrl": "http://www.shugarysweets.com/2014/03/copycat-panera-macaroni-cheese",
                "openLicense": 0,
                "image": "Copycat-Panera-Macaroni-and-Cheese-558057.jpg"
            },
            {
                "id": 718981,
                "title": "Cheeseburger Gnocchi",
                "readyInMinutes": 45,
                "servings": 4,
                "sourceUrl": "http://www.kevinandamanda.com/recipes/dinner/cheeseburger-gnocchi.html",
                "openLicense": 0,
                "image": "cheeseburger-gnocchi-718981.jpg"
            },
            {
                "id": 718828,
                "title": "21 Day Fix Broccoli Mac & Cheese (AKA the perfect Mac & Cheese)",
                "readyInMinutes": 45,
                "servings": 8,
                "sourceUrl": "http://thefoodieandthefix.com/21-day-fix-broccoli-mac-cheese-aka-the-perfect-mac-cheese/",
                "openLicense": 0,
                "image": "21-day-fix-broccoli-mac-cheese-(aka-the-perfect-mac-cheese)-718828.jpg"
            },
            {
                "id": 492413,
                "title": "Chicken Gnocchi Soup (Olive Garden Copycat)",
                "readyInMinutes": 65,
                "servings": 6,
                "sourceUrl": "http://www.cinnamonspiceandeverythingnice.com/olive-garden-chicken-and-gnocchi-soup-copycat/",
                "openLicense": 0,
                "image": "Chicken-Gnocchi-Soup-(Olive-Garden-Copycat)-492413.jpg"
            },
            {
                "id": 489179,
                "title": "Healthy Three-Cheese Chicken Penne Pasta Bake",
                "readyInMinutes": 45,
                "servings": 4,
                "sourceUrl": "http://www.the-girl-who-ate-everything.com/2010/08/healthy-three-cheese-penne-pasta-bake.html",
                "openLicense": 0,
                "image": "Healthy-Three-Cheese-Chicken-Penne-Pasta-Bake-489179.jpg"
            },
            {
                "id": 624358,
                "title": "Baked Spaghetti",
                "readyInMinutes": 50,
                "servings": 12,
                "sourceUrl": "http://www.sixsistersstuff.com/2011/08/baked-spaghetti.html",
                "openLicense": 0,
                "image": "Baked-Spaghetti-624358.jpg"
            }
        ]
        let recipiesLoading = false;
    // let recipiesLoading = useSelector((state)=> state.recipeReducer.recipiesLoading);
    let favourites = useSelector((state)=> state.favouritesReducer.favourites);
    let favouritesLoading = useSelector((state)=> state.favouritesReducer.favouritesLoading);

    const [query, setQuery] = useState('');
    const [isOnListening, setIsOnListening] = useState(false);

    const history = useHistory()

    const handleQuery = (value) => {
        setQuery(value);
    }

    const search = (e) => {
        e.preventDefault();
        if(query !== ''){
            history.push(`/search?query=${query}`)
        }
    }

    function speechToText() {
        // speech recognition API supported
        var SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition(); 
        // This will run when the speech recognition service returns a result
        recognition.onstart = function() {
            console.log("Voice recognition started. Try speaking into the microphone.");
            setIsOnListening(true);
        };
        
        recognition.onresult = function(event) {
            setIsOnListening(false);
            var transcript = event.results[0][0].transcript;
            if (query !== '' || query !== undefined || query !== null) {
                setQuery(transcript);
                console.log('querrry', query)
                if(transcript !== ''){
                    history.push(`/search?query=${transcript}`)
                }
            }
        };
        // start recognition
        recognition.start();
    }

    useEffect(()=>{
        const { query } = queryString.parse(location.search);
        setQuery(query);
        // dispatch(getFavourites);
        // dispatch(getRecipies(query));
    }, [location.search])


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
            <div className='searchBar2'> 
            <SearchIcon style={{fontSize: "40px", marginLeft: '8px', marginTop: '8px', color: '#FF5F6D'}}/>
            <form className='searchForm2' onSubmit={search}>
                <input 
                autoFocus
                onChange={(e)=>handleQuery(e.target.value)}
                // placeholder='what are you craving...' 
                className='searchInput2' 
                value={query}
                type="text"/>
            </form>
            <IconButton onClick={speechToText}>
            {isOnListening ? 
            <MicIcon style={{fontSize: "30px", right: '3vw'}} className='iconColor'/>
            :
            <MicIcon style={{fontSize: "30px", right: '3vw'}} />  
            }
            </IconButton>

            </div>
        </div>

        <h1 style={{textAlign:"center",color:"#fd515c"}}>Search Results</h1>

        <br/>
        {   recipiesLoading &&
            <div style={{textAlign:"center"}}>
            <img height="300" width="300" src="loading.gif" alt="loading" />
            </div>
        }

        {   !recipiesLoading &&
            // <div className="wrapper">
            <Grid container lg={12} spacing={3} className={'resultSearch'}>
            {   
                recipies.map((recipe, idx) => {
                    return(
                        <Grid item lg={6} sm={12} className={'resultDetail'}>
                        <div  key={idx}>
                        <FoodCard  recipe={recipe}/>
                        </div>
                        </Grid>
                    )
                })
            }
            </Grid>
            // </div>
        }

        <br/>
        <br/>
        <br/>

        </div>
    )
}
export default SearchResults;
