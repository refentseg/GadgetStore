import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import AppTextInput from '../../../app/components/AppTextInput';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { StripeInput } from '../Stripeinput';
import { StripeElementType } from '@stripe/stripe-js';

interface Props{
  cardState:{elementError:{[key in StripeElementType]?:string}};
  onCardInputChange:(event:any) => void;
}

export default function PaymentForm({cardState,onCardInputChange}:Props) {
 //PayStack

//Stripe
  const {control} = useFormContext();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <AppTextInput
            name="nameOnCard"
            label="Name on card"
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            id="cardNumber"
            label="Card number"
            fullWidth
            variant='outlined'
            InputLabelProps={{shrink: true}}
            InputProps={{
              inputComponent:StripeInput,
              inputProps:{
                component: CardNumberElement
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          {/*Create a date picker with month and date only */}
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry date"
            fullWidth
            variant='outlined'
            InputLabelProps={{shrink: true}}
            InputProps={{
              inputComponent:StripeInput,
              inputProps:{
                component: CardExpiryElement
              }
            }}
            
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id="cvv"
            label="CVV"
            fullWidth
            variant='outlined'
            InputLabelProps={{shrink: true}}
            InputProps={{
              inputComponent:StripeInput,
              inputProps:{
                component: CardCvcElement
              }
            }}

          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}