import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/Store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../Basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponet";


const stripePromise = loadStripe('pk_test_51NdrCWB0cNVyW11pdLtHofDki4FiMC9OmoPypBjiS6QdaAtcN9e3SgpFE2EHvpHBcHOotAw3bqtpTNTGYBLeWKVp00vi7rUWV1');

export default function CheckoutWrapper()
{   const dispatch = useAppDispatch();

    const [loading,setLoading] = useState(true)


    useEffect(()=>{
        agent.Payments.createPaymentIntent()
            .then(basket =>dispatch(setBasket(basket)))
            .catch(error=>console.log(error))
            .finally(()=>setLoading(false))
    },[dispatch])
    
 if (loading) return <LoadingComponent message='Loading Checkout...'/>
    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage/>
        </Elements>
    )
}