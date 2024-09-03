// import {
//     Button,
//   Card,
//   CardActions,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   Typography,
// } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../app/models/product";
// import { LoadingButton } from '@mui/lab'
// import { currencyFormat } from "../../app/util/util";
import { useAppDispatch,} from "../../app/Store/configureStore";
import { addBasketItemAsync } from "../Basket/basketSlice";
import IconButton from "../../app/components/ui/icon-buttton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "../../app/components/ui/currency";
// import { useTheme } from '@mui/material/styles';
import { MouseEventHandler} from "react";
import usePreviewModal from "../../app/hooks/use-preview-modal";

interface Props {
  product: Product;
}

export default function ProductCard({ product}: Props) {
  // const {status} = useAppSelector(state =>state.basket);
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const previewModal = usePreviewModal();

  // const theme = useTheme();
 const handleClick = () =>{
  navigate(`/catalog/${product.id}`);
 }
const onPreview:MouseEventHandler<HTMLButtonElement> = (event) =>{
  event.stopPropagation();
  previewModal.onOpen(product);
 }

 const addToCart:MouseEventHandler<HTMLButtonElement> = (event) =>{
  event.stopPropagation();
  dispatch(addBasketItemAsync({productId: product.id}));
 }

  return (
    <>
    <div onClick={handleClick}
        className={`dark:bg-slate-950 bg-white group cursor-pointer rounded-xl border p-3 space-y-4 dark:border-neutral-700`}
      >
    <div className="aspect-square rounded-xl bg-gray-100 relative">
       {/* create Image component */}
       <img className="aspect-square object-cover rounded-md" src={product.pictureUrl}/>
    
    <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
      <div className="flex gap-x-6 justify-center">
         <IconButton
         onClick={onPreview}
         icon={<Expand size={20} className="text-gray-600"/>}/>
         <IconButton
         onClick={addToCart}
         icon={<ShoppingCart size={20} className="text-gray-600"/>}/>
      </div>
   </div>
   </div>
   {/* Description of Product */}
   <div>
      <p className="font-semibold text-lg">{product.name}</p>
      <p className="text-sm text-gray-500">{product.type}</p>
   </div>
   {/* Price */}
   <div className="flex items-center justify-between font-semibold">
        <Currency value={product.price} />
   </div>
   
</div>
</>   
  );
}