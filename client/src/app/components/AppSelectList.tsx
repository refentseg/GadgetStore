import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps{
    label:string;
    items:string[];
}

export default function AppSelectList(props:Props) {
    const {fieldState,field} = useController({...props,defaultValue:''});
  return (
    <FormControl fullWidth>
      <InputLabel>{props.label}</InputLabel>
      <Select
        value={field.value}
        label={props.label}
        onChange={field.onChange}
        error={!!fieldState.error}
      >
        {props.items.map((item,index)=>(
            <MenuItem key={index} value={item}>{item}</MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!fieldState.error}>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  );
}
