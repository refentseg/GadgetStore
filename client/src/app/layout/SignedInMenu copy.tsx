import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch, useAppSelector } from '../Store/configureStore';
import { signOut } from '../../features/account/accountSlice';
import { useNavigate } from 'react-router-dom';
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
          {user?.email}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My orders</MenuItem>
          <MenuItem onClick={handleSignOut}>Logout</MenuItem>
        </Menu>
      </>
    );
}