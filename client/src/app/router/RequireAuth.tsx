import { useLocation, Outlet, Navigate} from "react-router-dom";
import { useAppSelector } from "../Store/configureStore";
import { toast } from "react-toastify";
import { Sidebar } from "lucide-react";

interface Props{
    roles?:string[];
}
export default function RequireAuth({roles}:Props)
{
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();
    if (!user) {
    return <Navigate to='/login' state={{from: location}} />
    }
    
     if(roles && !roles.some(r=>user.roles?.includes(r))){
        toast.error('Not authorised to acces this area')
        return <Navigate to='/catalog'/>
    }

  return(
    <>
    
     <Outlet />
    </>
    
  );
}