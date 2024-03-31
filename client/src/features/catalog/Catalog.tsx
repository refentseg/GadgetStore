import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponet";
import ProductList from "./ProductList";
import { useAppDispatch, useAppSelector } from "../../app/Store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import {
  Grid,
  Paper,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtunGroup";
import CheckBoxButtons from "../../app/components/CheckBoxButton";
import AppPagination from "../../app/components/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "priceAsce", label: "Price - Low to high" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types,productParams,metaData } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  //Two use Effects because it shows the product/filter twice on the redux
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded){
   return <LoadingComponent message="Loading products..." />;
  }

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup 
          selectedValue={productParams.orderBy}
          options={sortOptions}
          onChange={(e) =>dispatch(setProductParams({orderBy: e.target.value}))} />

        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons
          items={brands}
          checked={productParams.brands} 
          onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}
          />         
        </Paper>
        <Paper sx={{mb:2,p:2}}>
        <CheckBoxButtons
          items={types}
          checked={productParams.types} 
          onChange={(items:string[])=>dispatch(setProductParams({types:items}))}
          /> 
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={9} sx={{mb:2}}>
        {metaData &&        
        <AppPagination
        metaData={metaData}
        onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber: page}))}
        />}
      </Grid>
    </Grid>
  );
}
