import { Checkbox } from "@components/checkbox";
import { PRODUCT_TYPES } from "@constants/filters/filter";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectProductTypes,
  toggleProductType,
} from "@redux/slices/filterSlice";
import { useState } from "react";
import { GoDash, GoPlus } from "react-icons/go";

const ProductTypeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedProductTypes = useAppSelector(selectProductTypes);
  const [isExpanded, setIsExpanded] = useState(true);

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
          {PRODUCT_TYPES.map((type) => (
            <Checkbox
              key={type.id}
              label={type.label}
              onClick={() => handleProductTypeChange(type.id)}
              isChecked={selectedProductTypes.includes(type.id)}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeFilter;
