import { Checkbox } from "@components/checkbox";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import BrandFilterSkeleton from "./BrandFilterSkeleton";
import { useGetBrandsQuery } from "@services/brandApi";
import { selectBrands, toggleBrand } from "@redux/slices/filterSlice";

const BrandFilter = () => {
  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector(selectBrands);
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    data: brandsResponse,
    isLoading,
    error,
  } = useGetBrandsQuery({
    pageSize: 100,
    pageNumber: 1,
    orderBy: "ASC",
  });

  if (isLoading) {
    return <BrandFilterSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Có lỗi xảy ra khi tải dữ liệu thương hiệu
      </div>
    );
  }

  const handleBrandChange = (brandId: string) => {
    dispatch(toggleBrand(brandId));
  };

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={toggleAccordion}
      defaultExpanded={true}
      sx={{
        boxShadow: "none",
        borderTop: isExpanded ? "none" : "0px solid #ccc",
        pt: isExpanded ? "0px" : "10px",
        pb: isExpanded ? "0px" : "10px",
      }}
    >
      <AccordionSummary
        expandIcon={
          isExpanded ? (
            <GoDash size={20} color="#000" />
          ) : (
            <GoPlus size={20} color="#000" />
          )
        }
      >
        <span className="font-medium text-[13px]">NHÃN HÀNG</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-6">
          {brandsResponse?.data &&
            brandsResponse?.data.map((brand) => (
              <Checkbox
                key={brand.id}
                label={brand.name}
                onClick={() => handleBrandChange(brand.id.toString())}
                isChecked={selectedBrands.includes(brand.id.toString())}
              />
            ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default BrandFilter;
