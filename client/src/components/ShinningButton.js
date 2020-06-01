/* eslint-disable max-len */
import React from "react";
import Button from "@material-ui/core/Button";

export const getTheme = muiBaseTheme => ({
  MuiButton: {
    root: {
      "&.MuiButton--shinning": {
        position: "relative",
        paddingLeft: 16,
        paddingRight: 16,
        background:
          "linear-gradient(to right, #FF5F6D, #eaafc8)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
        "&:after": {
          content: '" "',
          borderRadius: muiBaseTheme.shape.borderRadius,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: "0 0 20px 0 #f5005780",
          animation: "mui-ripple-pulsate 1s infinite",
          zIndex: -1
        }
      }
    },
    label: {
      color: muiBaseTheme.palette.common.white,
      textTransform: "none",
      fontSize: 20,
      fontWeight: 700
    },
    contained: {
      minHeight: 30,
      boxShadow: muiBaseTheme.shadows[0],
      "&$focusVisible": { boxShadow: muiBaseTheme.shadows[0] },
      "&:active": { boxShadow: muiBaseTheme.shadows[0] },
      "&$disabled": { boxShadow: muiBaseTheme.shadows[0] }
    }
  },
  "@keyframes mui-shine": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "100%": { transform: "scale(1.5)", opacity: 0 }
  }
});

const ShinningButton = (props) => (
    <Button className={"MuiButton--shinning"}>
      <div style={{width: '300px'}}>
        <p style={{fontSize: '40px'}}>{props.words}</p>
      </div>
    </Button>
);

ShinningButton.getTheme = getTheme;
ShinningButton.displayName = "Button";
ShinningButton.metadata = {
  name: "Shinning",
  description: "I love to be shinned"
};

export default ShinningButton;
