import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectSizes, toggleSize } from "@redux/slices/filterSlice";
import { SIZES } from "@constants/filters/filter";
import Checkbox from "@components/checkbox/Checkbox";

const SizeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedSizes = useAppSelector(selectSizes);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSizeChange = (sizeId: string) => {
    dispatch(toggleSize(sizeId));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      elevation={0}
      sx={{
        '&.MuiAccordion-root': {
          borderRadius: 0,
          borderBottom: '1px solid #eee',
        },
        '&.MuiAccordion-root:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<FiChevronDown className="text-[20px] text-black"/>}
        sx={{
          padding: '16px 0',
          '& .MuiAccordionSummary-content': {
            margin: 0,
          },
          '& .MuiAccordionSummary-expandIconWrapper': {
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          },
        }}
      >
        <span className="font-bold text-[17px]">Size</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0 0 16px 0' }}>
        <div className="flex flex-col gap-4">
          {SIZES.map((size) => (
            <div key={size.id} className="flex items-center justify-between">
              <Checkbox
                label={size.label}
                isChecked={selectedSizes.includes(size.id)}
                onClick={() => handleSizeChange(size.id)}
                classname={selectedSizes.includes(size.id) ? 'font-medium' : ''}
              />
              {/* {size.count && (
                <span className="text-gray-500 text-[13px]">
                  ({size.count})
                </span>
              )} */}
            </div>
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default SizeFilter;
