import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAVBAR_TEXTS, navbarProps } from "../../utils/constants";
import { DrawerHeader,AppBar,Drawer } from "../../utils/helpers";
import {
  MenuItem,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import RuleIcon from "@mui/icons-material/Rule";

export default function MiniDrawer() {
  const location = useLocation();
  const textToShow = NAVBAR_TEXTS.find(
    (el) => el.page === location.pathname
  )?.text;
  const [open, setOpen] = useState(false);

  const listRender = ({ link, text,index }) => {
    return (
      <MenuItem component={Link} to={link} sx={{ padding: "0" }} key={index}>
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "",
          }}
        >
          <ListItemIcon
            sx={{
              mr: open ? 0.5 : "auto",
              justifyContent: "center",
            }}
          >
            {text === "MERCHANTS" ? (
              <AccountCircleIcon />
            ) : text === "PAYMENT SERVICE PROVIDERS" ? (
              <PointOfSaleIcon />
            ) : text === "MERCHANT PAYMENT METHODS" ? (
              <CreditCardIcon />
            ) : (
              <RuleIcon />
            )}
          </ListItemIcon>
          <ListItemText
            primary={text}
            sx={{ opacity: open ? 1 : 0, color: "#e3324a"}}
          />
        </ListItemButton>
      </MenuItem>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ background: "#e3324a" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {textToShow}
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              marginLeft:
                textToShow === "Merchant Payment Methods"
                  ? "54rem"
                  : textToShow === "Payment Service Providers"
                  ? "54rem"
                  : "63rem",
            }}
          >
            Payment Routing Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} onMouseOver={() => setOpen(true)} onMouseOut={() => setOpen(false)}>
        <DrawerHeader/>
        <Divider />
        <List>
          {navbarProps.map((item, index) => {
            return listRender({ link: item.link, text: item.text,index });
          })}
        </List>
      </Drawer>
    </Box>
  );
}
