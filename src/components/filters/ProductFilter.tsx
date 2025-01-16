import BrandFilter from "./BrandFilter";
import ColorFilter from "./ColorFilter";
import ProductTypeFilter from "./ProductTypeFilter";
import { IoArrowBack } from "react-icons/io5";

const ProductFilter = () => {
  return (
    <div className="w-full max-w-[300px]">
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
    </div>
  );
};

export default ProductFilter;
