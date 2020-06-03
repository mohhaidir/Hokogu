import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography
} from "@material-ui/core";
import { useStyles } from "../assets/css";
import axios from "axios";
import { CardStep } from "../components";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useBlogTextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/blog";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import { Card, CardContent } from "@material-ui/core/";
import cx from "clsx";
import clsx from "clsx";

import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { useArrowDarkButtonStyles } from "@mui-treasury/styles/button/arrowDark";
import { usePushingGutterStyles } from "@mui-treasury/styles/gutter/pushing";

import StepConnector from "@material-ui/core/StepConnector";
import { useParams } from "react-router-dom";
import { spoonKEY } from "../host";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient(to right, #ffcbcb, #FF5F6D)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient(to right, #ffcbcb, #FF5F6D)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1
  }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage: "linear-gradient(to right, #ffcbcb, #FF5F6D)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage: "linear-gradient(to right, #ffcbcb, #FF5F6D)"
  }
});

function ColorlibStepIcon(props) {
  console.log(props);
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      <h1>{icon}</h1>
    </div>
  );
}

const useStyle = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    margin: "auto",
    borderRadius: spacing(2), // 16px
    transition: "0.3s",
    boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: "relative",
    width: "100%",
    overflow: "initial",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export default function StepCooking(props) {
  const classes = useStyles();
  const styles = useStyle();
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  const classes2 = useArrowDarkButtonStyles();
  const gutterStyles = usePushingGutterStyles({
    firstExcluded: true,
    space: 2
  });

  const { id } = useParams();

  const [activeStep, setActiveStep] = React.useState(0);
  const [showIngredient, setShowIngredient] = React.useState(false);
  const [showEquipment, setShowEquipment] = React.useState(false);
  const [dataIngredient, setDataIngredient] = React.useState([]);
  const [dataEquipment, setDataEquipment] = React.useState([]);
  const [allStep, setAllStep] = React.useState([]); // step, ingredient, equipment
  const [steps, setSteps] = React.useState([]); // array step
  const [resultText, setResultText] = React.useState("");

  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);
  const update = () => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", update);

  useEffect(() => {
    axios({
      url: `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${spoonKEY}`,
      method: "GET"
    })
      .then(result => {
        setAllStep(result.data[0].steps);
        let temp = [];
        temp.push("Let's Cook");
        result.data[0].steps.forEach(item => {
          temp.push(item.step);
        });
        temp.push("Let's Eat");
        setSteps(temp);
        console.log(result.data[0]);
        setActiveStep(0);
        textToSpeech("Let's Cook");
      })
      .catch(err => {
        console.log("error", err);
      });
    const intervalSpeechToText = setInterval(speechToText, 5000);

    // returned function will be called on component unmount
    return () => {
      clearInterval(intervalSpeechToText);
    };
  }, []);

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
  }, [activeStep]);

  function speechToText() {
    // speech recognition API supported
    var SpeechRecognition =
      window.speechRecognition || window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
    // This will run when the speech recognition service returns a result
    recognition.onstart = function() {
      console.log(
        "Voice recognition started. Try speaking into the microphone."
      );
    };

    recognition.onresult = function(event) {
      var transcript = event.results[0][0].transcript;
      if (transcript === "next") {
        handleNext();
      } else if (
        transcript === "back" ||
        (transcript[0] === "b" && transcript[1] === "a")
      ) {
        handleBack();
      }
      console.log("text hasil mic", transcript);
    };

    // start recognition
    recognition.start();
  }

  function textToSpeech(text) {
    var synthesis = window.speechSynthesis;
    // Get the first `en` language voice in the list
    var voice = synthesis.getVoices().filter(function(voice) {
      return voice.lang === "en";
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
    return `Step ${stepIndex + 1}`;
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <div className="bannerStep">
        <div>
          {width * 1.35 > height && (
            <>
              <div
                style={{
                  margin: "auto",
                  height: "66.6vh",
                  textOverflow: "ellipsis",
                  overflow: "hidden"
                }}
              >
                <h1 className="stepText">
                  {steps && steps.length !== 0 && steps[activeStep]}
                </h1>
              </div>
              <br />
              <br />
            </>
          )}
          {activeStep >= 1 && activeStep < steps.length && (
            <Button
              onClick={handleBack}
              classes={classes2}
              style={{
                color: "#FF5F6D",
                fontWeight: "bold",
                border: "5px solid #FF5F6D",
                position: "fixed",
                zIndex: "99",
                top: "42vh",
                left: "3vw"
              }}
            >
              <KeyboardArrowLeft style={{ color: "#FF5F6D" }} />
            </Button>
          )}
          {activeStep < steps.length - 1 && (
            <Button
              onClick={handleNext}
              classes={classes2}
              style={{
                color: "#FF5F6D",
                fontWeight: "bold",
                border: "5px solid #FF5F6D",
                position: "fixed",
                zIndex: "99",
                top: "42vh",
                right: "3vw"
              }}
            >
              <KeyboardArrowRight style={{ color: "#FF5F6D" }} />
            </Button>
          )}
        </div>

        <Box className="mainContent">
          <Card className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
              <Stepper
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                alternativeLabel
                style={{ overflowX: "scroll" }}
              >
                {steps.map(label => (
                  <Step color="secondary" key={label}>
                    {width * 1.35 <= height && (
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        color="secondary"
                      >
                        {label}
                      </StepLabel>
                    )}

                    {width * 1.35 > height && (
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        color="secondary"
                      ></StepLabel>
                    )}
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* <Grid container  className='content'>
            </Grid> */}
        </Box>
      </div>
    </div>
  );
}
