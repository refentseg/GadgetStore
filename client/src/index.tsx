import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/Store/configureStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <>
     <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
 </>
  
);
