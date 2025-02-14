import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Pagination,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { OrderStatusBadge } from "@components/order";
import { OrderStatus } from "@types-d/enums";
import { SearchInputComponent } from "@components/search";
import { CiSearch } from "react-icons/ci";
import DropdownButton, {
  Option,
} from "@components/dropdownButton/DropdownButton";

const stateStatus: Option[] = [
  { id: "", label: "All" },
  { id: OrderStatus.Pending.toString(), label: "Pending" },
  { id: OrderStatus.Confirmed.toString(), label: "Confirmed" },
  { id: OrderStatus.Processing.toString(), label: "Processing" },
  { id: OrderStatus.Shipped.toString(), label: "Shipped" },
  { id: OrderStatus.Delivered.toString(), label: "Delivered" },
  { id: OrderStatus.Cancelled.toString(), label: "Cancelled" },
  { id: OrderStatus.Refunded.toString(), label: "Refunded" },
  { id: OrderStatus.Failed.toString(), label: "Failed" },
];

const sortOptions: Option[] = [
  {
    id: "newest",
    label: "Newest",
  },
  {
    id: "oldest",
    label: "Oldest",
  },
  {
    id: "lowest-price",
    label: "Lowest Price",
  },
  {
    id: "highest-price",
    label: "Highest Price",
  },
];

const orderData = [
  {
    id: 1,
    product: "Raw Black T-Shirt Lineup",
    date: "20 Mar, 2023",
    total: "$75.00",
    status: "Processing",
    image: "👕",
  },
  {
    id: 2,
    product: "Classic Monochrome Tees",
    date: "19 Mar, 2023",
    total: "$35.00",
    status: "Processing",
    image: "👕",
  },
  {
    id: 3,
    product: "Monochromatic Wardrobe",
    date: "7 Feb, 2023",
    total: "$27.00",
    status: "Completed",
    image: "👘",
  },
  {
    id: 4,
    product: "Essential Neutrals",
    date: "29 Jan, 2023",
    total: "$22.00",
    status: "Completed",
    image: "👕",
  },
  {
    id: 5,
    product: "UTRAANET Black",
    date: "27 Jan, 2023",
    total: "$43.00",
    status: "Processing",
    image: "👕",
  },
  {
    id: 6,
    product: "Elegant Ebony Sweatshirts",
    date: "4 Jan, 2023",
    total: "$35.00",
    status: "Cancelled",
    image: "🧥",
  },
  {
    id: 7,
    product: "Sleek and Cozy Black",
    date: "28 Dec, 2022",
    total: "$57.00",
    status: "Completed",
    image: "🧥",
  },
  {
    id: 8,
    product: "MOCKUP Black",
    date: "20 Dec, 2022",
    total: "$30.00",
    status: "Processing",
    image: "👕",
  },
];

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);
  const rowsPerPage = 8;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [searchOrder, setSearchOrder] = useState("");
  const [sortCurrent, setSortCurrent] = useState(sortOptions[0].id);
  const [orderStatusCurrent, setOrderStatusCurrent] = useState(stateStatus[0]);

  // Date filter state
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    orderId: number
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setCurrentOrderId(null);
  };

  const handleDetailClick = () => {
    console.log(`View details for order #${currentOrderId}`);
    handleMenuClose();
  };

  const handleUpdateClick = () => {
    console.log(`Update order #${currentOrderId}`);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    console.log(`Delete order #${currentOrderId}`);
    handleMenuClose();
  };

  const handleSearchOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchOrder(event.target.value);
  };

  const handleOpenDateFilter = () => {
    setDateFilterOpen(true);
  };

  const handleCloseDateFilter = () => {
    setDateFilterOpen(false);
  };

  const handleApplyDateFilter = () => {
    // Format dates for backend query
    const formattedStartDate = startDate ? startDate.toISOString() : null;
    const formattedEndDate = endDate ? endDate.toISOString() : null;

    console.log("Applying date filter:", {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    // Here you would typically call an API or update your query parameters

    handleCloseDateFilter();
  };

  const handleClearDateFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  // Format dates for display
  const formatDateForDisplay = (date: Dayjs | null) => {
    if (!date) return "";
    return date.format("MMM D, YYYY");
  };

  const activeDateFilter = startDate || endDate;

  return (
    <Box sx={{ padding: "24px", backgroundColor: "#fff", borderRadius: "8px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Orders
        </Typography>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="">
            <SearchInputComponent
              icon={<CiSearch />}
              onChange={(e) => handleSearchOrderChange(e)}
              onSeachClick={() => alert("Searching...")}
              placeholder="Search"
              value={searchOrder}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outlined"
              startIcon={<FilterAltOutlinedIcon />}
              onClick={handleOpenDateFilter}
              sx={{
                borderColor: activeDateFilter
                  ? theme.palette.primary.main
                  : "#E2E8F0",
                color: activeDateFilter
                  ? theme.palette.primary.main
                  : "#64748B",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: "rgba(59, 130, 246, 0.04)",
                },
              }}
            >
              {activeDateFilter
                ? `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(
                    endDate
                  )}`
                : "Date Filter"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Status :</span>
            <DropdownButton
              options={stateStatus}
              currentOption={orderStatusCurrent.label}
              defaultOption={stateStatus[0]}
              onOptionSelect={(option) => setOrderStatusCurrent(option)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sort :</span>
            <DropdownButton
              options={sortOptions}
              currentOption={sortCurrent}
              defaultOption={sortOptions[0]}
              onOptionSelect={(option) => setSortCurrent(option.id)}
            />
          </div>
        </div>
      </Box>

      <TableContainer component={Paper} elevation={0} sx={{ mb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "50px" }}>
                <SortIcon fontSize="small" sx={{ color: "#94A3B8" }} />
              </TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#F8FAFC" },
                }}
              >
                <TableCell>
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "4px",
                      fontSize: "20px",
                    }}
                  >
                    {row.image}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontWeight: "medium" }}>
                  {row.product}
                </TableCell>
                <TableCell sx={{ color: "#64748B" }}>{row.date}</TableCell>
                <TableCell sx={{ fontWeight: "medium" }}>{row.total}</TableCell>
                <TableCell>
                  <OrderStatusBadge status={OrderStatus.Confirmed} />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(e) => handleMenuOpen(e, row.id)}
                    sx={{
                      color: "#64748B",
                      "&:hover": {
                        backgroundColor: "#F1F5F9",
                        color: "#0F172A",
                      },
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={24}
          page={page}
          onChange={handleChangePage}
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: "14px",
              color: "#64748B",
            },
            "& .Mui-selected": {
              backgroundColor: "#F1F5F9",
              fontWeight: "bold",
              color: "#0F172A",
            },
          }}
        />
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
            mt: 1.5,
            width: 160,
            "& .MuiMenuItem-root": {
              fontSize: 14,
              py: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDetailClick} sx={{ color: "#334155" }}>
          <VisibilityOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Detail
        </MenuItem>
        <MenuItem onClick={handleUpdateClick} sx={{ color: "#334155" }}>
          <EditOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Update
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={handleDeleteClick} sx={{ color: "#EF4444" }}>
          <DeleteOutlineOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Date Range Filter Dialog */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog
          open={dateFilterOpen}
          onClose={handleCloseDateFilter}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Filter by Date Range
          </DialogTitle>
          <DialogContent sx={{ mt: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    InputLabelProps: {
                      shrink: true,
                    },
                  },
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                minDate={startDate || undefined}
                slotProps={{
                  textField: {
                    variant: "outlined",
                    fullWidth: true,
                    InputLabelProps: {
                      shrink: true,
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleClearDateFilter} sx={{ color: "#64748B" }}>
              Clear
            </Button>
            <Button onClick={handleCloseDateFilter} sx={{ color: "#64748B" }}>
              Cancel
            </Button>
            <Button
              onClick={handleApplyDateFilter}
              variant="contained"
              sx={{
                bgcolor: "#1E40AF",
                "&:hover": {
                  bgcolor: "#1E3A8A",
                },
              }}
            >
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </Box>
  );
};

export default AdminOrders;
