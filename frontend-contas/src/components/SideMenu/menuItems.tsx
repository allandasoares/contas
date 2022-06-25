import { ReactElement } from "react";
import { SvgIconTypeMap } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Path } from "react-router-dom";

type MenuItem = {
  title: String;
  icon: ReactElement<SvgIconTypeMap>;
  path: any;
};
export const menuItems: MenuItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeIcon style={{fill: '#ffffff'}}/>,
  },
  {
    title: "Banks",
    path: "/banks",
    icon: <AccountBalanceIcon style={{fill: '#ffffff'}} />,
  },
];
