import { ReactElement } from "react";
import { SvgIconTypeMap } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

type MenuItem = {
  title: String;
  icon: ReactElement<SvgIconTypeMap>;
  path: any;
};
export const menuItems: MenuItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <HomeIcon style={{ fill: "#bbb5b5" }} />,
  },
  {
    title: "Banks",
    path: "/banks",
    icon: <AccountBalanceIcon style={{ fill: "#bbb5b5" }} />,
  },
  {
    title: "Transations",
    path: "/transations",
    icon: <ReceiptIcon style={{ fill: "#bbb5b5" }} />,
  },
  {
    title: "Category",
    path: "/category",
    icon: <LocalOfferIcon style={{ fill: "#bbb5b5" }} />,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon style={{ fill: "#bbb5b5" }} />,
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: <CalendarMonthIcon style={{ fill: "#bbb5b5" }} />,
  },
];
