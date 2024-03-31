import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCookie(key:string){
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

export function currencyFormat(amount:number){
 return 'R ' + (amount/100).toFixed(2);
}

export const formatter = new Intl.NumberFormat("en-ZA",{
  style:'currency',
  currency:'ZAR',
  minimumFractionDigits:2
});

//delivery
export function deliveryFee(subtotal:number){

}