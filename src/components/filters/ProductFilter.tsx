import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import ProductTypeFilter from "./ProductTypeFilter";
import { IoArrowBack } from "react-icons/io5";
import SizeFilter from "./SizeFilter";
import PriceRangeFilter from "./PriceRangeFilter";

const ProductFilter = () => {
  return (
    <div className="w-full max-w-[350px]">
      <div className="flex items-center justify-between px-[18px] pb-[10px]">
        <span className="text-[20px] font-bold block ">BỘ LỌC</span>
        <div
          className="text-[20px] cursor-pointer py-4
        "
        >
          <IoArrowBack />
        </div>
      </div>

      <BrandFilter />

      <ColorFilter />

      <ProductTypeFilter />

      <SizeFilter />

      <PriceRangeFilter />
    </div>
  );
};

export default ProductFilter;
