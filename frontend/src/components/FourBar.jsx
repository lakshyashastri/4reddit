import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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

import jwt_decode from "jwt-decode";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import AppsIcon from "@mui/icons-material/Apps";
import PublicIcon from "@mui/icons-material/Public";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import InfoIcon from "@mui/icons-material/Info";

import Logo from "./Logo";
import {ROOT} from "./ProtectedRoute";
import TrollFace from "../assets/defaultIcon.jpg";

export default function FourBar(props) {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElBoardit, setAnchorElBoardit] = useState(null);

    const navigate = useNavigate();

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenBoarditMenu = event => {
        setAnchorElBoardit(event.currentTarget);
    };

    const handleCloseNavMenu = (event, page) => {
        if (event.target.textContent == "Home") {
            navigate("/");
        } else if (event.target.textContent == "All BoardIts") {
            navigate("/all");
        } else if (event.target.textContent == "My BoardIts") {
            navigate("/my");
        } else if (event.target.textContent == "Saved posts") {
            navigate("/saved");
        }
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = event => {
        if (event.target.textContent == "Logout") {
            localStorage.removeItem("username");
            localStorage.removeItem("token");
            navigate("/");
            window.location.reload();
        } else if (event.target.textContent == "My Profile") {
            navigate(
                `/u/${
                    jwt_decode(window.localStorage.getItem("token")).username
                }`
            );
        }
        setAnchorElUser(null);
    };

    const handleCloseBoarditMenu = event => {
        if (event.target.textContent == "Home") {
            navigate(`/r/${props.boarditName}`);
        } else if (event.target.textContent == "Users") {
            navigate(`/r/${props.boarditName}/users`);
        } else if (event.target.textContent == "Join requests") {
            navigate(`/r/${props.boarditName}/joinreq`);
        } else if (event.target.textContent == "Reports") {
            navigate(`/r/${props.boarditName}/reports`);
        } else if (event.target.textContent == "Stats") {
            navigate(`/r/${props.boarditName}/stats`);
        }
        setAnchorElBoardit(null);
    };

    const barItems = {
        Home: <HomeIcon />,
        "4chat": <ChatIcon />,
        "My BoardIts": <AppsIcon />,
        "All BoardIts": <PublicIcon />,
        "Saved posts": <BookmarksIcon />
    };
    const profileDropdown = ["My Profile", "Notifications", "Logout"];
    const boarditInfo = ["Home", "Users", "Join requests", "Reports", "Stats"];

    return (
        <AppBar position="static">
            <Grid>
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{display: {xs: "none", md: "flex"}, mr: 1}} /> */}
                    <Logo
                        sx={{
                            height: "48px",
                            width: "48px",
                            margin: "4px",
                            marginLeft: "16px"
                        }}
                        href={ROOT}
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
                            {Object.keys(barItems).map(page => (
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
                        {Object.keys(barItems).map(page => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{
                                    my: 2,
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "100%"
                                }}
                                // disableRipple={true}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start"
                                    }}
                                >
                                    <Box mt={0.8} mr={1}>
                                        {barItems[page]}
                                    </Box>
                                    <Typography>{page}</Typography>
                                </Box>
                            </Button>
                        ))}
                        {props.boarditName ? (
                            <React.Fragment>
                                <Button
                                    key="boardit"
                                    onClick={handleOpenBoarditMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-start"
                                        }}
                                    >
                                        <Box mt={0.8} mr={1}>
                                            <InfoIcon />
                                        </Box>

                                        <Typography component={"div"}>
                                            <Box
                                                sx={{
                                                    textTransform: "lowercase",
                                                    fontSize: 19
                                                }}
                                            >
                                                r/{props.boarditName}
                                            </Box>
                                        </Typography>
                                    </Box>
                                </Button>
                                <Menu
                                    sx={{mt: "45px"}}
                                    id="menu-boardit"
                                    anchorEl={anchorElBoardit}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                    }}
                                    open={Boolean(anchorElBoardit)}
                                    onClose={handleCloseBoarditMenu}
                                >
                                    {boarditInfo.map(setting => (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleCloseBoarditMenu}
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </React.Fragment>
                        ) : null}
                    </Box>
                    <Box sx={{flexGrow: 0.03}}>
                        <Tooltip
                            title="Open settings"
                            TransitionComponent={Zoom}
                            arrow
                        >
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{p: 0, pl: 2}}
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
                            {profileDropdown.map(setting => (
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
    //                         {props.profileDropdown.map(item => {
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
