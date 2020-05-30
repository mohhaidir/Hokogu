import React from 'react';
import ReactDOM from "react-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import LargeGradientButton from '../components/LargeGardientButton'



export default function Home() {
    const muiBaseTheme = createMuiTheme();

    return (
        <>

        <div style={{
        backgroundImage: `url('https://cutewallpaper.org/21/pastel-backgrounds/Watercolor-Background-Tumblr-Mint-Green-Pastel-Background-.jpg')`,
        // backgroundColor: 'wheat',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '70vh',
        padding: '400px',
        paddingTop: '100px',
        textAlign: 'center'
        }}>
            <h1 className='homeSlogan' style={{textAlign: 'center'}}>
                    Nothing brings people together like good food
            </h1>
            <MuiThemeProvider
            theme={createMuiTheme({
            typography: {
            useNextVariants: true
            },
            overrides: LargeGradientButton.getTheme(muiBaseTheme)
            })}
            >
            <br/>

            
            <LargeGradientButton words='Find Recipes'/>
            </MuiThemeProvider>


        </div>
        </>
    )
}