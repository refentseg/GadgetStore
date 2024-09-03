import { ShoppingBag } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  styled,
  Switch,
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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#aab4be',
        ...theme.applyStyles('dark', {
          backgroundColor: '#8796A5',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: '#001e3c',
    width: 32,
    height: 32,
    '&::before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#003892',
    }),
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: '#aab4be',
    borderRadius: 20 / 2,
    ...theme.applyStyles('dark', {
      backgroundColor: '#8796A5',
    }),
  },
}));

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

export default function Header({darkMode,handleThemeChange}:Props) {
  const{basket} = useAppSelector(state => state.basket);
  const {user} = useAppSelector(state=>state.account)
  const itemCount = basket?.items.reduce((sum,item)=>sum+item.quantity,0)
  return (
    <AppBar position="static" elevation={0} style={{
      background: darkMode ? '#1a1a1a' : '#fafafa',
      color: darkMode ? 'white' : 'black'
  }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant="h5" component={NavLink} to={'/'}>GadgetStore</Typography>
          <MaterialUISwitch
            sx={{ m: 1 }}
            checked={darkMode}
            onChange={handleThemeChange}
          />
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
