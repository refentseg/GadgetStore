import { ShoppingBag } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../Store/configureStore";
import SignedInMenu from "./SignedInMenu";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}
const midlinks = [
  { title: "catalog", path: "/catalog" },
  // { title: "about", path: "/about" },
  // { title: "contact", path: "/contact" },
];

const rightlinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const NavStyles = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header() {
  const{basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state=>state.account)
  const itemCount = basket?.items.reduce((sum,item)=>sum+item.quantity,0)
  return (
    <AppBar position="static" elevation={0} style={{ background: '#fafafa',color:'black' }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant="h5" component={NavLink} to={'/'}>GadgetStore</Typography>
          {/* <MaterialUISwitch
            sx={{ m: 1 }}
            checked={darkMode}
            onChange={handleThemeChange}
          /> */}
        </Box>

        <List sx={{ display: "flex"}}>
          {midlinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={NavStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
          {user && user.roles?.includes('Admin') &&
            <ListItem
            component={NavLink}
            to={'/inventory'}
             sx={NavStyles}
            >
              INVENTORY
            </ListItem>
          }
          
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket' size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingBag />
            </Badge>
          </IconButton>
          {user? (
            <SignedInMenu />
          ):(
            <List sx={{ display: "flex" }}>
            {rightlinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={NavStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
          )} 
        </Box>
      </Toolbar>
    </AppBar>
  );
}
