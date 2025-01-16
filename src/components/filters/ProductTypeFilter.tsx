import { PRODUCT_TYPES } from "@constants/filters/filter";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { GoPlus, GoDash } from "react-icons/go"; // Import biểu tượng
import { Checkbox } from "@components/checkbox";
import { useState } from "react";

const ProductTypeFilter = () => {
  const [isExpanded, setIsExpanded] = useState(true); // Trạng thái mở/đóng của Accordion
  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>(
    []
  ); // Trạng thái các sản phẩm đã chọn

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev); // Đảo trạng thái mở/đóng
  };

  const handleProductTypeChange = (typeId: string) => {
    setSelectedProductTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
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
          ) // Biểu tượng động
        }
      >
        <span className="font-medium text-[13px]">SẢN PHẨM</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-5">
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
