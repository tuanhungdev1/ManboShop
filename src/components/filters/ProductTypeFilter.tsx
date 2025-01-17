import { Checkbox } from "@components/checkbox";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectProductTypes,
  toggleProductType,
} from "@redux/slices/filterSlice";
import { useGetCategoriesQuery } from "@services/categoryApi";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";
import CategoryFilterSkeleton from "./CategoryFilterSkeleton";

const ProductTypeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedProductTypes = useAppSelector(selectProductTypes);
  const [isExpanded, setIsExpanded] = useState(true);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useGetCategoriesQuery({
    pageSize: 100,
    pageNumber: 1,
    orderBy: "ASC",
  });

  if (isLoading) {
    return <CategoryFilterSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Có lỗi xảy ra khi tải dữ liệu danh mục
      </div>
    );
  }

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleProductTypeChange = (typeId: string) => {
    dispatch(toggleProductType(typeId));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={toggleAccordion}
      defaultExpanded={true}
      sx={{
        boxShadow: "none",
        pt: "10px",
        pb: "10px",
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
        <span className="font-medium text-[13px]">SẢN PHẨM</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-6">
          {categoriesResponse?.data &&
            categoriesResponse?.data.map((category) => (
              <Checkbox
                key={category.id}
                label={category.name}
                onClick={() => handleProductTypeChange(category.name)}
                isChecked={selectedProductTypes.includes(category.name)}
              />
            ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeFilter;
