import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import './style.css'
import { Container, CssBaseline, createTheme} from '@mui/material';
import { useAppDispatch } from '../Store/configureStore';
import { useCallback, useEffect, useState } from 'react';
import { fetchBasketAsync } from '../../features/Basket/basketSlice';
import LoadingComponent from './LoadingComponet';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import HomePage from '../../features/home/HomePage';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import ModalProvider from '../providers/Modalprovider';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const[loading,setLoading] = useState(true);

  //Persisting Login for user
  const initApp = useCallback(async () => {
    try{
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }catch(error){
      console.log(error)
    }
  },[dispatch])
  
   useEffect(()=>{
     initApp().then(()=>setLoading(false))
   },[initApp])
   
   const [darkMode, setDarkMode] = useState(false);


   useEffect(() => {
    // Update Tailwind dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      primary:{
        main:'#362FD9',
      },
      secondary:{
        main:'#375fbb'
      },
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#333333",
      },
    },
  });

 function handleThemeChange() {
    setDarkMode(!darkMode);
  }
   if (loading) return <LoadingComponent message="Initiallizing app..." />
  return (
    <ThemeProvider theme={theme}>
    <ToastContainer position="bottom-right" hideProgressBar />
    <CssBaseline />
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
    <ModalProvider />
    {loading? <LoadingComponent message="Initiallizing app..." />
     :location.pathname === '/' ? <HomePage />
     :<Container sx={{mt:4}}>
        <Outlet />
      </Container>
    }
    </ThemeProvider>
  );
}

export default App;
