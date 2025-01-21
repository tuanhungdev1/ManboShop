import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import ProductTypeFilter from "./ProductTypeFilter";
import SizeFilter from "./SizeFilter";
import PriceRangeFilter from "./PriceRangeFilter";

const ProductFilter = () => {
  return (
    <div className="w-full lg:max-w-[350px] pb-10">

      <BrandFilter />

      <PriceRangeFilter />

      <ColorFilter />

      <ProductTypeFilter />

      <SizeFilter />

      
    </div>
  );
};

export default ProductFilter;
