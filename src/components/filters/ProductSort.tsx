// components/ProductSort.tsx
import { useState } from "react";
import { Menu, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectSortBy, setSortBy } from "@redux/slices/filterSlice";

interface SortOption {
  id: string;
  label: string;
}

const SORT_OPTIONS: SortOption[] = [
  { id: "featured", label: "Sản phẩm nổi bật" },
  { id: "newest", label: "Sản phẩm mới" },
  { id: "bestseller", label: "Bán chạy nhất" },
  { id: "price-desc", label: "Giá cao nhất" },
  { id: "price-asc", label: "Giá thấp nhất" },
];

interface ProductSortProps {
  totalProducts?: number;
  onSortChange?: (sortId: string) => void;
}

const ProductSort = ({ totalProducts = 0, onSortChange }: ProductSortProps) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(selectSortBy);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Tìm option hiện tại dựa vào currentSort từ Redux
  //   const currentSortOption =
  //     SORT_OPTIONS.find((option) => option.id === currentSort) || SORT_OPTIONS[0];

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (option: SortOption) => {
    dispatch(setSortBy(option.label));
    onSortChange?.(option.id);
    handleClose();
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4 select-none">

      <div className="">
        <Button
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={{
            color: "black",
            textTransform: "none",
            fontSize: "15px",
            fontWeight: 600,
            px: "20px",
          }}
        >
          SẮP XẾP
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              minWidth: "200px",
              mt: 1,
              "& .MuiMenuItem-root": {
                typography: "body2",
              },
            },
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.id}
              onClick={() => handleSortSelect(option)}
              className={`
                px-4 py-2 
                cursor-pointer 
                text-[15px] 
                hover:bg-gray-100 
                transition-colors
                ${currentSort === option.id ? "bg-gray-200" : ""}
              `}
            >
              {option.label}
            </div>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default ProductSort;
