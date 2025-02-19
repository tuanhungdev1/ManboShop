import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectBrands, toggleBrand } from "@redux/slices/filterSlice";
import BrandFilterSkeleton from "./BrandFilterSkeleton";
import { useGetBrandsQuery } from "@services/brandApi";
import Checkbox from "@components/checkbox/Checkbox";

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
      <div className="p-4 text-red-500 font-medium">
        Có lỗi xảy ra khi tải dữ liệu thương hiệu
      </div>
    );
  }

  const handleBrandChange = (brand: string) => {
    dispatch(toggleBrand(brand));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      elevation={0}
      sx={{
        "&.MuiAccordion-root": {
          borderRadius: 0,
          borderBottom: "1px solid #eee",
        },
        "&.MuiAccordion-root:before": {
          display: "none",
        },
      }}
      className="bg-red-300"
    >
      <AccordionSummary
        expandIcon={<FiChevronDown className="text-[20px] text-black" />}
        sx={{
          padding: "16px 0",
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          },
        }}
      >
        <span className="font-bold text-[17px]">Thương hiệu</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 0 16px 0" }}>
        <div className="flex flex-col gap-4">
          {brandsResponse?.data &&
            brandsResponse?.data.map((brand) => (
              <div className="flex items-center justify-between">
                <Checkbox
                  label={brand.name}
                  isChecked={selectedBrands.includes(brand.name.toString())}
                  onClick={() => handleBrandChange(brand.name.toString())}
                  classname={
                    selectedBrands.includes(brand.id.toString())
                      ? "font-medium"
                      : ""
                  }
                />
                {/* {brand.productCount && (
                <span className="text-gray-500 text-[13px]">
                  ({brand.productCount})
                </span>
              )} */}
              </div>
            ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default BrandFilter;
