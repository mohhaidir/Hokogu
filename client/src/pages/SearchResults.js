import React, {useEffect, useState} from 'react'
import queryString from 'query-string';
import FoodCard from '../components/FoodCard'
import { useSelector, useDispatch} from "react-redux";
import { getRecipies } from "../store/actions/recipeActions";
import { getFavourites } from "../store/actions/favouritesActions";

import { Grid } from '@material-ui/core';
import {Link, useHistory} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search';


const SearchResults = ({ location }) => {
    const dispatch = useDispatch();
    let recipies = useSelector((state)=> state.recipeReducer.recipies);
    let recipiesLoading = useSelector((state)=> state.recipeReducer.recipiesLoading);
    let favourites = useSelector((state)=> state.favouritesReducer.favourites);
    let favouritesLoading = useSelector((state)=> state.favouritesReducer.favouritesLoading);

    const [query, setQuery] = useState('');
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

    useEffect(()=>{
        const { query } = queryString.parse(location.search);
        setQuery(query);
        dispatch(getFavourites);
        dispatch(getRecipies(query));
    }, [location.search])


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
