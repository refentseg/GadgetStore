import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../Store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { Link, useNavigate } from 'react-router-dom';
import { clearBasket } from '../../features/Basket/basketSlice';

export default function SignedInMenu(){
    const dispatch = useAppDispatch();
    const history = useNavigate();
    const {user} = useAppSelector(state=>state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event:any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleSignOut = async() =>{
        dispatch(signOut());
        await dispatch(clearBasket())
        history('/');
    }
  
    return (
      <>
        <Button
          id="basic-button"
          onClick={handleClick}
          sx={{typography:'h6',color:'white'}}
        >
            {/*Users email*/}
          {/* {user?.email} */}

          <img className="h-8 w-8 rounded-full" src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt={user?.email} />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem component={Link} to='/orders'>My orders</MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </>
    );
}