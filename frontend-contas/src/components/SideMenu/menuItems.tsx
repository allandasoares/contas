import { ReactElement } from "react";
import { SvgIconTypeMap } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from '@mui/icons-material/CreditCard';
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
    icon: <HomeIcon style={{fill: '#bbb5b5'}}/>,
  },
  {
    title: "Banks",
    path: "/banks",
    icon: <AccountBalanceIcon style={{fill: '#bbb5b5'}} />,
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: <CreditCardIcon style={{fill: '#bbb5b5'}} />,
  },
];
