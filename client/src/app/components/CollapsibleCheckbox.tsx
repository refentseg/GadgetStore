import { FormControlLabel, Checkbox as MuiCheckbox, Collapse, styled } from "@mui/material";
import { useState } from "react";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

type CollapsibleCheckboxProps = {
    label: string;
    initialChecked?: boolean;
    onChange?: (checked: boolean) => void;
  };


  const Checkbox = styled(MuiCheckbox)({
    '& .MuiSvgIcon-root': {
      borderRadius: '50%',
    },
    '&.Mui-checked .MuiSvgIcon-root': {
      color: 'black',
    },
  });


export default function CollapsibleCheckbox({ label, initialChecked = false, onChange }: CollapsibleCheckboxProps)
{
  const [checked, setChecked] = useState(initialChecked);

  const handleDivClick = () => {
    // Toggle the checkbox state
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  }

    return (
        <div onClick={handleDivClick}
        style={{ border: '1px solid black',borderRadius:'10px',cursor:'pointer'}}
        >
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <FormControlLabel
            control={<Checkbox 
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
                checked={checked}  
                sx={{ marginRight: '10px',marginLeft:'20px' }}/>}
            label={label}
          />
          <div style={{marginRight:'30px'}}>
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/0169695890db3db16bfe.svg" alt="description" width={38} height={24} />
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/5e3b05b68f3d31b87e84.svg" alt="description" width={38} height={24} />
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/312fbdb3765a042c6178.svg" alt="description" width={38} height={24} />
            <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/ee93db95c51afcdea0da.svg" alt="description" width={38} height={24} />
          </div>
        </div>
          <Collapse in={checked} style={{background:'#f5f5f5f5'}}>
        <div style={{marginLeft:'20px',marginTop:'10px'}}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-252.3 356.1 163 80.9"
          width="240.5"
          height="120.45">
                <path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-108.9 404.1v30c0 1.1-.9 2-2 2H-231c-1.1 0-2-.9-2-2v-75c0-1.1.9-2 2-2h120.1c1.1 0 2 .9 2 2v37m-124.1-29h124.1"></path>
                <circle cx="-227.8" cy="361.9" r="1.8" fill="currentColor"></circle>
                <circle cx="-222.2" cy="361.9" r="1.8" fill="currentColor"></circle>
                <circle cx="-216.6" cy="361.9" r="1.8" fill="currentColor"></circle>
                <path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="2" d="M-128.7 400.1H-92m-3.6-4.1 4 4.1-4 4.1"></path>
          </svg>
         <div style={{background:'#f5f5f5f5',color:'black',alignItems:'center'}}>
              <p>After clicking “Pay now”, you will be redirected to PayFast
                to complete your purchase securely.</p>
            </div>
        </div>
          </Collapse>
        </div>
      );
}