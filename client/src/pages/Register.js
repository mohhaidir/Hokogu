import React from 'react';

export default function Register() {
    function btnTest() {
        
    }
    if ('speechSynthesis' in window) {
        
    } else {
        console.log('Text-to-speech not supported.');
    }
    return (
        <>

        <h1>Register</h1>
        <div onClick={btnTest}>
            test
        </div>
        </>
    )
}