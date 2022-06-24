import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';
import "./Home.css";
import api from "./../../services/Api";
import { toast } from "react-hot-toast";

const initialMenu = {
  name: "",
  profile: "",
};

function Home() {
  // Configs of menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //State do menu
  const [menu, setMenu] = useState(initialMenu);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    api
      .get(`/usuarios/${userId}`)
      .then((response) => {
        console.log("Response", response.data.data.nome);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // var initialName = initialMenu;
  // var initialProfile = initialMenu.profile;

  return (
    // <div className="containerHome">
    //   <div className="headerHome">
    //     <img src="/favicon.ico" alt="icone" className="iconC" />

    //     <div className="headerMenu">
    //       <React.Fragment>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             textAlign: "center",
    //           }}
    //         >
    //           <Tooltip title="Account settings">
    //             <IconButton
    //               onClick={handleClick}
    //               size="small"
    //               sx={{ ml: 2 }}
    //               aria-controls={open ? "account-menu" : undefined}
    //               aria-haspopup="true"
    //               aria-expanded={open ? "true" : undefined}
    //             >
    //               <Avatar sx={{ width: 32, height: 32 }}>{initialName}</Avatar>
    //             </IconButton>
    //           </Tooltip>
    //         </Box>
    //         <Menu
    //           anchorEl={anchorEl}
    //           id="account-menu"
    //           open={open}
    //           onClose={handleClose}
    //           onClick={handleClose}
    //           PaperProps={{
    //             elevation: 0,
    //             sx: {
    //               overflow: "visible",
    //               filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //               mt: 1.5,
    //               "& .MuiAvatar-root": {
    //                 width: 32,
    //                 height: 32,
    //                 ml: -0.5,
    //                 mr: 1,
    //               },
    //               "&:before": {
    //                 content: '""',
    //                 display: "block",
    //                 position: "absolute",
    //                 top: 0,
    //                 right: 14,
    //                 width: 10,
    //                 height: 10,
    //                 bgcolor: "white",
    //                 transform: "translateY(-50%) rotate(45deg)",
    //                 zIndex: 0,
    //               },
    //             },
    //           }}
    //           transformOrigin={{ horizontal: "right", vertical: "top" }}
    //           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //         >
    //           <MenuItem>{/* <Avatar /> Perfil {initialProfile} */}</MenuItem>
    //         </Menu>
    //       </React.Fragment>
    //     </div>

    //     <div className="bodyMenu"></div>
    //   </div>
    // </div>
    <></>
  );
}

export default Home;
