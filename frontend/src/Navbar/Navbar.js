import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    customColor: {
        // or hex code, this is normal CSS background-color
        backgroundColor: green[500]
    },
    customHeight: {
        minHeight: 200
    },
    offset: theme.mixins.toolbar
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const example = "default";
    const isCustomColor = example === "customColor";
    const isCustomHeight = example === "customHeight";
    return (
        <React.Fragment>
            <AppBar
                color={isCustomColor || isCustomHeight ? "primary" : example}
                className={`${isCustomColor && classes.customColor} ${isCustomHeight && classes.customHeight
                    }`}
            >
                <Toolbar>
                    {/* <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>
                        <img src="./codelab.svg" width="150px" style={{ marginTop: "10px" }} alt="icon.svg"></img>
                    </Typography>
                    <IconButton color="inherit">
                        Practice
                    </IconButton>
                    <IconButton color="inherit">
                        About Us
                    </IconButton>
                    <IconButton color="inherit">
                        Contact Us
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </React.Fragment >
    );
}
