import { useEffect } from "react";
import { productSelectors, fetchProductsAsync, fetchFilters } from "../../features/catalog/catalogSlice";
import { useAppSelector, useAppDispatch } from "../Store/configureStore";

export default function UseProducts(){
const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types,metaData } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  //Two use Effects because it shows the product/filter twice on the redux
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  return{
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData
  }
}