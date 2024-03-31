import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import BasketPage from "../../features/Basket/BasketPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import NotFound from "../Errors/NotFound";
import ServerError from "../Errors/ServerError";
import Register from "../../features/account/Register";
import Login from "../../features/account/Login";
import RequireAuth from "./RequireAuth";
import Inventory from "../../features/admin/Inventory";
import Orders from "../../features/orders/Orders";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            //Authenticated routes
            {element:<RequireAuth />,children:[
                {path:'checkout',element:<CheckoutWrapper/>},
                {path:'orders',element:<Orders/>}
            ]},
            //Admin routes
            {element:<RequireAuth roles={['Admin']}/>,children:[
                {path:'inventory',element:<Inventory/>}
            ]},
            {path: 'catalog', element: <Catalog/>},
            {path: 'catalog/:id', element: <ProductDetails />},
            {path: 'server-error', element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: 'basket', element: <BasketPage />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />}

        ]
    }
])