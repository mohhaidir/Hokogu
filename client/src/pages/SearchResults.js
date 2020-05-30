import React, {useEffect, useState} from 'react'
import queryString from 'query-string';
import FoodCard from '../components/FoodCard'
import { useSelector, useDispatch} from "react-redux";
import { getRecipies } from "../store/actions/recipeActions";
import { Grid } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';


const SearchResults = ({ location }) => {
    const dispatch = useDispatch();
    let recipies = useSelector((state)=> state.recipeReducer.recipies);
    let recipiesLoading = useSelector((state)=> state.recipeReducer.recipiesLoading);

    // const recipies = [
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
    //         "id": 666437,
    //         "title": "One Pot Wonder Tomato Basil Pasta",
    //         "readyInMinutes": 30,
    //         "servings": 6,
    //         "sourceUrl": "http://www.apronstringsblog.com/one-pot-wonder-tomato-basil-pasta-recipe/",
    //         "openLicense": 0,
    //         "image": "One-Pot-Wonder-Tomato-Basil-Pasta-666437.jpg"
    //     },
    //     {
    //         "id": 491786,
    //         "title": "Ranch BLT Pasta Salad",
    //         "readyInMinutes": 45,
    //         "servings": 8,
    //         "sourceUrl": "http://www.cinnamonspiceandeverythingnice.com/ranch-blt-pasta-salad/",
    //         "openLicense": 0,
    //         "image": "Ranch-BLT-Pasta-Salad-491786.jpg"
    //     },
    //     {
    //         "id": 558057,
    //         "title": "Copycat Panera Macaroni and Cheese",
    //         "readyInMinutes": 25,
    //         "servings": 8,
    //         "sourceUrl": "http://www.shugarysweets.com/2014/03/copycat-panera-macaroni-cheese",
    //         "openLicense": 0,
    //         "image": "Copycat-Panera-Macaroni-and-Cheese-558057.jpg"
    //     },
    //     {
    //         "id": 718981,
    //         "title": "Cheeseburger Gnocchi",
    //         "readyInMinutes": 45,
    //         "servings": 4,
    //         "sourceUrl": "http://www.kevinandamanda.com/recipes/dinner/cheeseburger-gnocchi.html",
    //         "openLicense": 0,
    //         "image": "cheeseburger-gnocchi-718981.jpg"
    //     },
    //     {
    //         "id": 718828,
    //         "title": "21 Day Fix Broccoli Mac & Cheese (AKA the perfect Mac & Cheese)",
    //         "readyInMinutes": 45,
    //         "servings": 8,
    //         "sourceUrl": "http://thefoodieandthefix.com/21-day-fix-broccoli-mac-cheese-aka-the-perfect-mac-cheese/",
    //         "openLicense": 0,
    //         "image": "21-day-fix-broccoli-mac-cheese-(aka-the-perfect-mac-cheese)-718828.jpg"
    //     },
    //     {
    //         "id": 492413,
    //         "title": "Chicken Gnocchi Soup (Olive Garden Copycat)",
    //         "readyInMinutes": 65,
    //         "servings": 6,
    //         "sourceUrl": "http://www.cinnamonspiceandeverythingnice.com/olive-garden-chicken-and-gnocchi-soup-copycat/",
    //         "openLicense": 0,
    //         "image": "Chicken-Gnocchi-Soup-(Olive-Garden-Copycat)-492413.jpg"
    //     },
    //     {
    //         "id": 489179,
    //         "title": "Healthy Three-Cheese Chicken Penne Pasta Bake",
    //         "readyInMinutes": 45,
    //         "servings": 4,
    //         "sourceUrl": "http://www.the-girl-who-ate-everything.com/2010/08/healthy-three-cheese-penne-pasta-bake.html",
    //         "openLicense": 0,
    //         "image": "Healthy-Three-Cheese-Chicken-Penne-Pasta-Bake-489179.jpg"
    //     },
    //     {
    //         "id": 624358,
    //         "title": "Baked Spaghetti",
    //         "readyInMinutes": 50,
    //         "servings": 12,
    //         "sourceUrl": "http://www.sixsistersstuff.com/2011/08/baked-spaghetti.html",
    //         "openLicense": 0,
    //         "image": "Baked-Spaghetti-624358.jpg"
    //     }
    // ]

    const [query, setQuery] = useState('');
    const history = useHistory()


    // const recipiesLoading = false;

    const handleQuery = (value) => {
        setQuery(value);
    }

    const search = (e) => {
        e.preventDefault();
        if(query !== ''){
            history.push(`/search?query=${query}`)
        }
    }

    useEffect(()=>{
        const { query } = queryString.parse(location.search);
        setQuery(query);
        dispatch(getRecipies(query));
    }, [location.search])

    // useEffect(()=>{
    //     console.log('check recipes')
    //     console.log('-----------')
    //     console.log(recipies)
    //     console.log('**********')


    // }, [recipies])

    return (
        <div style={{backgroundColor: 'white', minHeight: '100vh'}}> 
        <div style={{
        backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        paddingTop: '150px',
        textAlign: 'center'
        }}>
            <div className='searchBar2'> 
            <SearchIcon style={{fontSize: "40px", margin: '8px', color: '#FF5F6D'}}/>
            <form className='searchForm2' onSubmit={search}>
                <input 
                autoFocus
                onChange={(e)=>handleQuery(e.target.value)}
                placeholder='what are you craving...' 
                className='searchInput2' 
                value={query}
                type="text"/>
            </form>
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
            <div className="wrapper">
            {   
                recipies.map((recipe, idx) => {
                    return(
                        <div key={idx}>
                        <FoodCard recipe={recipe}/>
                        </div>
                    )
                })
            }
            </div>
        }

        <br/>
        <br/>
        <br/>

        </div>
    )
}
export default SearchResults;
