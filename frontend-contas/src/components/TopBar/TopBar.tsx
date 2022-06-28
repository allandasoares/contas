import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./../../services/Api";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const initialMenu = {
  name: "",
  profile: "",
};

function TopBar() {
  // Configs of menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  //State do menu
  const [menu, setMenu] = useState(initialMenu);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  useEffect(() => {
    api
      .get(`/usuarios/${userId}`)
      .then((response) => {
        setMenu({
          name: response.data.data.nome[0],
          profile: response.data.data.perfil_id,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function logout() {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.clear();
  }

  return (
    <>
      <AppBar position="fixed" style={{ zIndex: 9999 }}>
        <Toolbar sx={{ backgroundColor: "#1b1b1f", border: "0px" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="/favicon.ico"
              alt="icone"
              className="iconC"
              onClick={() => {
                navigate("/home");
              }}
            />
          </Typography>
          <IconButton
            style={{ color: "#bbb5b5" }}
            onClick={() => {
              navigate("/calendar");
            }}
          >
            <CalendarMonthOutlinedIcon />
          </IconButton>
          {/* Menu  */}
          <Box
            sx={{
              // display: "flex",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>{menu.name}</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "white",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>{menu.profile}</MenuItem>
            <MenuItem
              style={{ backgroundColor: "#cd5d5d" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopBar;
