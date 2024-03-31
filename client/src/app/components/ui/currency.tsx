import {formatter} from "./../../util/util"

interface Prop{
 value?:string|number;
}

export default function Currency({value}:Prop)
{ 
    return(
        <div className="font-semibold ">
          {formatter.format(Number(value)/100)}
        </div>
    )
}