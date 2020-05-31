import React, { useEffect } from 'react';
import { 
    Grid, 
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
} from '@material-ui/core';
import { useStyles } from '../assets/css';
import axios from 'axios';
import { CardStep } from '../components';

export default function StepCooking(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [showIngredient, setShowIngredient] = React.useState(false);
    const [showEquipment, setShowEquipment] = React.useState(false);
    const [dataIngredient, setDataIngredient] = React.useState([]);
    const [dataEquipment, setDataEquipment] = React.useState([]);
    const [allStep, setAllStep] = React.useState([]); // step, ingredient, equipment
    const [steps, setSteps] = React.useState([]); // array step
    const [resultText, setResultText] = React.useState('');

    useEffect(() => {
        // axios({
        //     url: `https://api.spoonacular.com/recipes/216954/analyzedInstructions?apiKey=5cd43e21289d449988abacef7d29dd14`,
        //     method: 'GET'
        // })
        // .then((result) => {
        //     setAllStep(result.data[0].steps);
        //     let temp = [];
        //     temp.push("Let's Cook");
        //     result.data[0].steps.forEach(item => {
        //         temp.push(item.step)
        //     });
        //     temp.push("Let's Eat");
        //     setSteps(temp);
        //     console.log(result.data[0])
        //     textToSpeech("Let's Cook");
        // })
        // .catch((err) => {
        //     console.log('error', err);
        // });
        setAllStep([
            {
                number: 8, 
                step: "Add the omelette and the peas, warm through, then … 2 bowls and top with the shallots and coriander.", 
                ingredients: [
                    {
                        id: 11677, 
                        name: "shallot", 
                        image: "shallots.jpg"
                    }
                ], 
                equipment: [
                    {
                        id: 404783, 
                        name: "bowl", 
                        image: "bowl.jpg"
                    }
                ]
            },
            {
                number: 8, 
                step: "Add the omelette and the peas, warm through, then … 2 bowls and top with the shallots and coriander.", 
                ingredients: [
                    {
                        id: 11677, 
                        name: "shallot2", 
                        image: "shallots.jpg"
                    }
                ], 
                equipment: [
                    {
                        id: 404783, 
                        name: "bowl2", 
                        image: "bowl.jpg"
                    }
                ]
            },
            {
                number: 8, 
                step: "Add the omelette and the peas, warm through, then … 2 bowls and top with the shallots and coriander.", 
                ingredients: [
                    {
                        id: 11677, 
                        name: "shallot3", 
                        image: "shallots.jpg"
                    }
                ], 
                equipment: [
                    {
                        id: 404783, 
                        name: "bowl3", 
                        image: "bowl.jpg"
                    }
                ]
            }
        ])
        setSteps(["Let's Cook", 
            "Heat most of the oil in a large wok and fry the shallots until crispy and golden.", 
            "Remove with a slotted spoon, season with salt and …ith 1 tsp of the soy sauce and some black pepper.", 
            "Pour out most of the oil from the wok and wipe with kitchen paper.", 
            "Add the eggs, swirl to coat the pan in a thin omelette layer, cook until set, then remove.", 
            "Roll up, slice and set aside.", 
            "Add the paste to the wok with the chicken and cook… soy sauce, then mix well to coat all the grains.", 
            "Heat through until piping hot.", 
            "Add the omelette and the peas, warm through, then … 2 bowls and top with the shallots and coriander.",
            "Let's Eat"
        ])
        textToSpeech("Let's Cook");
        const intervalSpeechToText = setInterval(speechToText, 5000);

        // returned function will be called on component unmount 
        return () => {
            clearInterval(intervalSpeechToText);
        }
    }, [])

    useEffect(() => {
        textToSpeech(steps[activeStep]);
        setShowIngredient(false);
        setShowEquipment(false);
        if (allStep[activeStep]) {
            if (allStep[activeStep].ingredients.length !== 0) {
                setDataIngredient(allStep[activeStep].ingredients);
                setShowIngredient(true);
            }
            if (allStep[activeStep].equipment.length !== 0) {
                setDataEquipment(allStep[activeStep].equipment);
                setShowEquipment(true);
            }
        }
    }, [activeStep])

    function speechToText() {
        // speech recognition API supported
        var SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition(); 
        // This will run when the speech recognition service returns a result
        recognition.onstart = function() {
            console.log("Voice recognition started. Try speaking into the microphone.");
        };
        
        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            if(transcript === 'next'){
                handleNext();
            } else if (transcript === 'back' || (transcript[0] === 'b' && transcript[1] === 'a' ) ) {
                handleBack();
            }
            console.log('text hasil mic', transcript);
        };
        
        // start recognition
        recognition.start();
    }

    function textToSpeech(text) {
        var synthesis = window.speechSynthesis;
        // Get the first `en` language voice in the list
        var voice = synthesis.getVoices().filter(function (voice) {
            return voice.lang === 'en';
        })[0];
        // Create an utterance object
        var utterance1 = new SpeechSynthesisUtterance(text);
        // Set utterance properties
        utterance1.voice = voice;
        utterance1.pitch = 1;
        utterance1.rate = 0.8;
        utterance1.volume = 0.8;
        // Speak the utterance
        synthesis.speak(utterance1);
    }
    
    function getStepContent(stepIndex) {
        return `Step ${stepIndex+1}`;
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box className='mainContent'>
            {props && JSON.stringify(props.type)}
            <Grid container spacing={3} className='content'>
                <Grid lg={12} container spacing={3}>
                    {showIngredient && <CardStep data={dataIngredient} type='Ingredients'/>}
                    {showEquipment && <CardStep data={dataEquipment} type='Equipment'/>}
                </Grid>
                <Grid item lg={12} className='labelStep'>
                    <h1>{steps && steps.length !== 0 && steps[activeStep]}</h1>
                </Grid>
                <Grid item xs={12}>
                    <Stepper activeStep={activeStep} alternativeLabel style={{overflowX: 'scroll'}}>
                        {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                        ))}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                        <div>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset} style={{backgroundColor:'rgba(220, 109, 109, 0.86)'}}>Reset</Button>
                        </div>
                        ) : (
                        <div>
                            {/* <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography> */}
                            <div  style={{display:'flex', justifyContent:'space-between'}}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                className={classes.backButton}
                                style={{backgroundColor: 'rgba(55, 136, 193, 0.86)'}}
                            >
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                            </div>
                        </div>
                        )}
                    </div>
                </Grid>
            </Grid>
        </Box>
    )
}