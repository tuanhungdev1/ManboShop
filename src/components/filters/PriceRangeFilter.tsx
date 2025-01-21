import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Slider } from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectPriceRange, setPriceRange } from "@redux/slices/filterSlice";
import { formatPrice } from "@utils/format";

const MIN_PRICE = 0;
const MAX_PRICE = 20000000;

const PriceRangeFilter = () => {
  const dispatch = useAppDispatch();
  const priceRange = useAppSelector(selectPriceRange);
  const [isExpanded, setIsExpanded] = useState(true);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    priceRange?.min || MIN_PRICE,
    priceRange?.max || MAX_PRICE,
  ]);

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as [number, number]);
  };

  const handlePriceChangeCommitted = (
    _event: Event | React.SyntheticEvent<Element, Event>,
    newValue: number | number[]
  ) => {
    const [min, max] = newValue as [number, number];
    dispatch(setPriceRange({ min, max }));
  };

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      defaultExpanded={true}
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
        <span className="font-bold text-[17px]">Filter by Price</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0 0 16px 0' }}>
        <div className="space-y-6">
          {/* Price Display */}
          <div className="text-[15px] font-medium">
            Price: {formatPrice(localPriceRange[0])} - {formatPrice(localPriceRange[1])}
          </div>

          {/* Slider */}
          <Slider
            value={localPriceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceChangeCommitted}
            min={MIN_PRICE}
            max={MAX_PRICE}
            sx={{
              color: '#000',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                backgroundColor: '#fff',
                border: '2px solid #000',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: 'none',
                },
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#e5e7eb',
                opacity: 1,
              },
              '& .MuiSlider-track': {
                backgroundColor: '#000',
              },
            }}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default PriceRangeFilter;
