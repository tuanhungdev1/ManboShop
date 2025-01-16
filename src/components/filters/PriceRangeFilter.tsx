import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { GoPlus, GoDash } from "react-icons/go";
import { useState } from "react";
import Slider from "@mui/material/Slider";

const PriceRangeFilter = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    100000, 20000000,
  ]);

  const toggleAccordion = () => {
    setIsExpanded((prev) => !prev);
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
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
        <span className="font-medium text-[13px]">GIÁ</span>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-4">
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={100000}
            max={20000000}
            step={100000}
            valueLabelDisplay="off"
          />
          <div className="flex justify-between text-sm">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceRangeFilter;
