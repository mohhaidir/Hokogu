import React from "react";
import Button from "@material-ui/core/Button";

export const getTheme = muiBaseTheme => ({
  MuiButton: {
    root: {
      "&.MuiButton--chubby": {
        borderRadius: 50
      },
      "&.MuiButton--gradient": {
        minWidth: 150,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        background:
          "linear-gradient(to right, #ffcbcb, #FF5F6D)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        "&:hover": {
          transform: "scale(1.1)"
        }
      }
    },
    label: {
      color: muiBaseTheme.palette.common.white,
      textTransform: "none",
      fontSize: 25,
      fontWeight: 700
    },
    contained: {
      minHeight: 30,
      boxShadow: muiBaseTheme.shadows[0],
      "&$focusVisible": {
        boxShadow: muiBaseTheme.shadows[0]
      },
      "&:active": {
        boxShadow: muiBaseTheme.shadows[0]
      },
      "&$disabled": {
        boxShadow: muiBaseTheme.shadows[0]
      }
    }
  }
});

const LargeGardientButton = (props) => (
  <>
    <Button className={"btnFind MuiButton--gradient MuiButton--chubby"}>
        {props.words}
    </Button>
  </>
);

LargeGardientButton.getTheme = getTheme;
LargeGardientButton.displayName = "Button";
LargeGardientButton.metadata = {
  name: "Gradient",
  description: "Welcome to the new trend"
};

export default LargeGardientButton;
