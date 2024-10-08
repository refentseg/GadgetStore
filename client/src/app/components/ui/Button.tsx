import {forwardRef} from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

const Button = forwardRef<HTMLButtonElement,ButtonProps>(({
    className,
    children,
    disabled,
    type = "button",
    ...props
},ref)=>{
    return(
        <button ref={ref} {...props}>

        </button>
    )
});

Button.displayName ="Button";