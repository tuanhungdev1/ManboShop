import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { GoPlus } from "react-icons/go";

const BrandFilterSkeleton = () => {
  return (
    <Accordion
      defaultExpanded={true}
      sx={{
        boxShadow: "none",
        pt: "10px",
        pb: "10px",
      }}
    >
      <AccordionSummary expandIcon={<GoPlus size={20} color="#000" />}>
        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default BrandFilterSkeleton;
