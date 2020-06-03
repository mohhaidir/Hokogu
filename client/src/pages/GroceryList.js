import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import GroceryTable from '../components/GroceryTable'
import { useDispatch, useSelector} from 'react-redux'
import { getGroceries } from "../store/actions/groceryAction";


export default function GroceryList() {
    const dispatch = useDispatch();
    const history = useHistory()
    const { isLoggedIn } = useSelector(state => state.userReducer);
    const {groceries, groceriesLoading} = useSelector(state => state.groceryReducer);
    const [checked, setChecked] = useState([]);
    const [height, setHeight] = useState(window.innerHeight)
    const [width, setWidth] = useState(window.innerWidth)
    const update = () => {
      setHeight(window.innerHeight)
      setWidth(window.innerWidth)
    };
    window.addEventListener("resize", update);
    
    useEffect(() => {
        if(!isLoggedIn){
            history.push('/')
        }
        dispatch(getGroceries());
    }, [isLoggedIn])

    return (
        <div style={{ textAlign:'center', backgroundColor: 'white', minHeight: '90vh'}}>
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
            <>
            {   groceriesLoading &&
                    <div style={{textAlign:"center"}}>
                        <img height="300" width="300" src="/loading.gif" alt="loading" />
                    </div>
            }
            
            {   (!groceriesLoading && groceries !== null) &&
                <div>
                    <GroceryTable groceries={groceries}/>
                </div>
            }
            </>
        </div>
    )
}