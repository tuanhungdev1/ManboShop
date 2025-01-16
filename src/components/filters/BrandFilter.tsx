import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { BRANDS } from "@constants/filters/filter";
import { GoPlus, GoDash } from "react-icons/go"; // Import cả hai biểu tượng
import { Checkbox } from "@components/checkbox";
import { useState } from "react";

const BrandFilter = () => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true); // Trạng thái của Accordion

  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev); // Đảo ngược trạng thái Accordion
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
        <div className="flex flex-col gap-5">
          {BRANDS.map((brand) => (
            <Checkbox
              key={brand.id}
              label={brand.label}
              onClick={() => handleBrandChange(brand.id)}
              isChecked={selectedBrands.includes(brand.id)}
            />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default BrandFilter;
