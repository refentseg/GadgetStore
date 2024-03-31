import { Grid, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BasketSummary from "./BasketSummary";
import { useAppSelector} from "../../app/Store/configureStore";
import BasketTable from "./BasketTable";

export default function BasketPage(){
  const {basket} = useAppSelector(state => state.basket);


  if(!basket) return <Typography variant='h3'>Your basket is empty</Typography>

  return(
      <>
        <BasketTable items={basket.items} />
        <br />
      <Grid container>
        <Grid item xs={6} />
         <Grid item xs ={6}>
          <BasketSummary />
          <Button
          component={Link}
          to='/checkout'
          size='large'
          fullWidth
          >Checkout</Button>
         </Grid>
        </Grid>      
      
      </>

    )
}