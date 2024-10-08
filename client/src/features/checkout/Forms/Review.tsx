import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import BasketSummary from '../../Basket/BasketSummary';
import BasketTable from '../../Basket/BasketTable';
import { useAppSelector } from '../../../app/Store/configureStore';

export default function Review() {
  const {basket} = useAppSelector(state => state.basket)
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && 
      <BasketTable items={basket.items} isBasket={false}/>}
        <br />
      <Grid container>
        <Grid item xs={6} />
         <Grid item xs ={6}>
          <BasketSummary />
         </Grid>
        </Grid>  
    </>
  );
}