import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Link, useHistory } from "react-router-dom";
import {
  logout,
  setIsLoggedIn,
  setToken,
  setName,
  setAvatar
} from "../store/actions/userActions";
import { Button } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import StarIcon from "@material-ui/icons/Star";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import GradientButton from "./GradientButton";
import { useSelector, useDispatch } from "react-redux";
import FavoriteIcon from "@material-ui/icons/Favorite";

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: "0 3px 6px rgba(0,0,0,0.01), 0 3px 6px rgba(0,0,0,0.23)",
    backgroundColor: "#fdfff5",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  menuButton: {
    color: "#ff9687"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    backgroundColor: "#fdfff5",
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
  }
}));

export default function PersistentDrawerLeft() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isLoggedIn } = useSelector(state => state.userReducer);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const muiBaseTheme = createMuiTheme();
  useEffect(() => {
    if (localStorage.getItem("hokogu_token")) {
      dispatch(setIsLoggedIn(true));
      dispatch(setToken(localStorage.getItem("hokogu_token")));
      dispatch(setName(localStorage.getItem("hokogu_token")));
      dispatch(setAvatar(localStorage.getItem("hokogu_token")));
    }
  }, [isLoggedIn]);

  const doLogout = () => {
    dispatch(logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        // style={{width: 'auto'}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar style={{ width: "100vw" }}>
          <div
            style={{
              display: "flex",
              padding: "5px",
              width: "100vw",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon style={{ fontSize: "50px" }} />
            </IconButton>
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src="/logo.png" height="50px"></img>
              </Link>
            </div>
            {isLoggedIn && (
              <div
                style={{
                  textDecoration: "none"
                  // justifyContent: 'flex-end'
                }}
                onClick={doLogout}
                edge="end"
              >
                <MuiThemeProvider
                  theme={createMuiTheme({
                    typography: {
                      useNextVariants: true
                    },
                    overrides: GradientButton.getTheme(muiBaseTheme)
                  })}
                >
                  <GradientButton words="Logout" />
                </MuiThemeProvider>
              </div>
            )}
            {!isLoggedIn && (
              <div
                style={{
                  textDecoration: "none"
                  // justifyContent: 'flex-end'
                }}
                edge="end"
              >
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <MuiThemeProvider
                    theme={createMuiTheme({
                      typography: {
                        useNextVariants: true
                      },
                      overrides: GradientButton.getTheme(muiBaseTheme)
                    })}
                  >
                    <GradientButton words="Login" />
                  </MuiThemeProvider>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          <Link
            onClick={handleDrawerClose}
            to="/"
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <HomeIcon style={{ color: "#ff9687", fontSize: "40px" }} />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"Home"}
                style={{ color: "#ff9687", fontSize: "60px" }}
              />
            </ListItem>
          </Link>
          <Link
            onClick={handleDrawerClose}
            to="/popular"
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <FavoriteIcon
                  style={{ color: "#ff9687", fontSize: "40px" }}
                />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"Popular"}
                style={{ color: "#ff9687", fontSize: "60px" }}
              />
            </ListItem>
          </Link>

          <Link
            onClick={handleDrawerClose}
            to="/favorites"
            style={{ textDecoration: "none" }}
          >
            <ListItem button>
              <ListItemIcon>
                {" "}
                <StarIcon style={{ color: "#ff9687", fontSize: "40px" }} />{" "}
              </ListItemIcon>
              <ListItemText
                primary={"My Favourites"}
                style={{ color: "#ff9687", fontSize: "60px" }}
              />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      ></main>
    </div>
  );
}
