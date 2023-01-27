import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Logo from "./Logo";
import TrollFace from "../assets/defaultIcon.jpg";

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

export default function FourBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event, page) => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = event => {
        if (event.target.textContent == "Logout") {
            window.localStorage.setItem("LOGGED_IN", JSON.stringify(false));
            window.location.reload();
        }
        setAnchorElUser(null);
    };

    const barItems = [
        "Home",
        "4chat",
        "My BoardIts",
        "All BoardIts",
        "Saved BoardIts"
    ];
    const dropdownItems = ["My Profile", "Notifications", "Logout"];

    return (
        <ElevationScroll {...props}>
            <AppBar position="static">
                <Grid maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}} /> */}
                        <Logo
                            sx={{
                                height: "48px",
                                width: "48px",
                                margin: "4px",
                                marginLeft: "16px"
                            }}
                            href="/"
                        />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {xs: "flex", md: "none"}
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: "block", md: "none"}
                                }}
                            >
                                {barItems.map(page => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{display: {xs: "flex", md: "none"}, mr: 1}} /> */}
                        {/* FOR PHONE TILL HERE */}
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {xs: "none", md: "flex"},
                                justifyContent: "space-evenly"
                            }}
                        >
                            {barItems.map(page => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block"
                                    }}
                                    // disableRipple={true}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{flexGrow: 0.03}}>
                            <Tooltip
                                title="Open settings"
                                TransitionComponent={Zoom}
                                arrow
                            >
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{p: 0}}
                                >
                                    <Avatar src={TrollFace} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: "45px"}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {dropdownItems.map(setting => (
                                    <MenuItem
                                        key={setting}
                                        onClick={handleCloseUserMenu}
                                    >
                                        <Typography textAlign="center">
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Grid>
            </AppBar>
        </ElevationScroll>
    );
    // const [anchorElUser, setAnchorElUser] = React.useState(null);
    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };
    // const handleOpenUserMenu = event => {
    //     setAnchorElUser(event.currentTarget);
    // };
    // return (
    //     <AppBar position="static">
    //         <Grid container>
    //             <Toolbar disableGutters>
    //                 <Logo
    //                     height="48px"
    //                     width="48px"
    //                     margin="4px"
    //                     marginLeft="16px"
    //                 />
    //                 <Grid sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
    //                     {props.barItems.map(item => (
    //                         <Button
    //                             key={item}
    //                             sx={{my: 3, color: "white", display: "block"}}
    //                         >
    //                             {item}
    //                         </Button>
    //                     ))}
    //                 </Grid>
    //                 <Box sx={{flexGrow: 0}}>
    //                     <Tooltip
    //                         title="Account"
    //                         TransitionComponent={Zoom}
    //                         arrow
    //                     >
    //                         <IconButton
    //                             onClick={handleOpenUserMenu}
    //                             sx={{
    //                                 p: 0,
    //                                 heigh: "48px",
    //                                 width: "48px"
    //                             }}
    //                         >
    //                             <Avatar src={TrollFace} />
    //                         </IconButton>
    //                     </Tooltip>
    //                     <Menu
    //                         sx={{mt: "45px"}}
    //                         anchorEl={anchorElUser}
    //                         anchorOrigin={{
    //                             vertical: "top",
    //                             horizontal: "right"
    //                         }}
    //                         keepMounted
    //                         transformOrigin={{
    //                             vertical: "top",
    //                             horizontal: "right"
    //                         }}
    //                         open={Boolean(anchorElUser)}
    //                         onClose={handleCloseUserMenu}
    //                     >
    //                         {props.dropdownItems.map(item => {
    //                             <MenuItem
    //                                 key={item}
    //                                 onClick={handleCloseUserMenu}
    //                             >
    //                                 <Typography textAlign="center">
    //                                     {item}
    //                                 </Typography>
    //                             </MenuItem>;
    //                         })}
    //                     </Menu>
    //                 </Box>
    //             </Toolbar>
    //         </Grid>
    //     </AppBar>
    // );
}
