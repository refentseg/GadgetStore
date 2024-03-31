import { Typography, Divider } from "@mui/material";
import usePreviewModal from "../hooks/use-preview-modal"
import Currency from "./ui/currency";
import Modal from "./ui/modal";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../Store/configureStore";
import { addBasketItemAsync } from "../../features/Basket/basketSlice";
import { ShoppingCart } from "lucide-react";

export default function PreviewModal(){
    const previewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);

    const {status} = useAppSelector(state =>state.basket);
    const dispatch = useAppDispatch();
         
    if(!product){
        return null;
    }
    return(
        <div>
            <Modal
            open={previewModal.isOpen}
            onClose={previewModal.onClose}>
                <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="sm:col-span-4 lg:col-span-5">
                    <img className="aspect-square object-cover rounded-md" src={product?.pictureUrl}/>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                    <Typography variant='h3'>{product?.name}</Typography>
                     <Divider sx={{mb:2}}/>
                     <p className="text-sm text-gray-500 mb-2">{product.type}</p>
                     <Typography variant='h5' color="secondary"><Currency value={product?.price} /></Typography>
                     <div className="mt-10 flex items-center gap-x-3">
                     <LoadingButton
                    className="flex items-center gap-x-2"
                    loading={status.includes('pending')}
                    onClick={() =>dispatch(addBasketItemAsync({productId: product.id}))}
                    color='primary'
                    variant='contained'
                    fullWidth>
                     Add to Cart<ShoppingCart />
                    </LoadingButton>
                     </div>
                    </div>

                </div>

            </Modal>
        </div>
    )
}