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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { OrderStatusBadge, PaymentMethodBadge } from "@components/order";
import { OrderStatus } from "@types-d/enums";
import { SearchInputComponent } from "@components/search";
import { CiSearch } from "react-icons/ci";
import DropdownButton, {
  Option,
} from "@components/dropdownButton/DropdownButton";
import { useCancelOrderMutation, useGetOrdersQuery } from "@services/orderApi";
import { formatDate, formatDateTime } from "@utils/format";
import PaymentStatusBadge from "@components/order/PaymentStatusBadge";
import { LoadingComponent } from "@components/loadings";
import { OrderDto } from "@types-d/order";
import { BsBoxSeam } from "react-icons/bs";
import OrderDetailModal from "@components/modals/OrderDetailModal";
import { OrderCancelModel } from "@components/modals";

const stateStatus: Option[] = [
  { id: "", label: "Tất cả" },
  { id: OrderStatus.Pending.toString(), label: "Chờ xử lý" },
  { id: OrderStatus.Confirmed.toString(), label: "Đã xác nhận" },
  { id: OrderStatus.Processing.toString(), label: "Đang xử lý" },
  { id: OrderStatus.Shipped.toString(), label: "Đã vận chuyển" },
  { id: OrderStatus.Delivered.toString(), label: "Đã giao hàng" },
  { id: OrderStatus.Cancelled.toString(), label: "Đã hủy" },
  { id: OrderStatus.Refunded.toString(), label: "Đã hoàn tiền" },
  { id: OrderStatus.Failed.toString(), label: "Thất bại" },
];

const getOrderTimeline = (order: OrderDto) => {
  const timeline = [
    {
      status: "Đơn hàng đã đặt",
      date: order.createdAt,
      color: "bg-blue-500", // Xanh dương
    },
  ];

  if (order.confirmedAt) {
    timeline.push({
      status: "Đã xác nhận",
      date: order.confirmedAt,
      color: "bg-green-500", // Xanh lá
    });
  }

  if (order.processedAt) {
    timeline.push({
      status: "Đang xử lý",
      date: order.processedAt,
      color: "bg-yellow-500", // Vàng
    });
  }

  if (order.shippedAt) {
    timeline.push({
      status: "Đã giao cho đơn vị vận chuyển",
      date: order.shippedAt,
      color: "bg-orange-500", // Cam
    });
  }

  if (order.deliveredAt) {
    timeline.push({
      status: "Đã giao hàng",
      date: order.deliveredAt,
      color: "bg-gray-700", // Xanh đậm
    });
  }

  if (order.cancelledAt) {
    timeline.push({
      status: "Đã hủy",
      date: order.cancelledAt,
      color: "bg-red-500", // Đỏ
    });
  }

  return timeline;
};

const sortOptions: Option[] = [
  {
    id: "newest",
    label: "Mới nhất",
  },
  {
    id: "oldest",
    label: "Cũ nhất",
  },
  {
    id: "lowest-price",
    label: "Giá thấp nhất",
  },
  {
    id: "highest-price",
    label: "Giá cao nhất",
  },
];

const AdminOrders = () => {
  // Helpers
  const formatDateForBackend = (date: Date | null): string | undefined => {
    if (!date) return undefined;

    // Đảm bảo lấy ngày local
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const formatDateForDisplay = (date: Dayjs | null): string => {
    if (!date) return "";
    return date.format("DD/MM/YYYY");
  };

  // Component state
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderDto | null>(null);
  const [isOpenOrderDetail, setIsOpenOrderDetail] = useState(false);
  const rowsPerPage = 10;
  const theme = useTheme();
  const [searchOrder, setSearchOrder] = useState("");
  const [searchOrderQuery, setSearchOrderQuery] = useState("");
  const [sortCurrent, setSortCurrent] = useState(sortOptions[0].id);
  const [orderStatusCurrent, setOrderStatusCurrent] = useState(stateStatus[0]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  // Date filter states
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateTemp, setStartDateTemp] = useState<Dayjs | null>(null);
  const [endDateTemp, setEndDateTemp] = useState<Dayjs | null>(null);
  const [dateFilterOpen, setDateFilterOpen] = useState(false);

  // Order status helper
  const getOrderStatusFromId = (id: string): OrderStatus | undefined => {
    if (!id.trim()) return undefined;
    const numericId = Number(id);
    return numericId in OrderStatus
      ? (OrderStatus[numericId] as unknown as OrderStatus)
      : undefined;
  };

  const [cancelOrder] = useCancelOrderMutation();

  // API query
  const {
    data: ordersResponse,
    isLoading,
    isFetching,
    refetch,
  } = useGetOrdersQuery({
    pageSize: rowsPerPage,
    pageNumber: page,
    orderBy: sortCurrent,
    searchTerm: searchOrderQuery,
    fromDate: formatDateForBackend(startDate),
    toDate: formatDateForBackend(endDate),
    orderStatus: getOrderStatusFromId(orderStatusCurrent.id),
  });

  const handleCancelOrder = async (reason: string) => {
    await cancelOrder({
      id: selectedOrder?.id!,
      orderForCancelDto: {
        cancellationReason: reason,
      },
    }).unwrap();

    setSelectedOrder(null);
  };
  // Date filter handlers
  const handleOpenDateFilter = () => {
    // Khởi tạo giá trị temp từ giá trị hiện tại
    setStartDateTemp(startDate ? dayjs(startDate) : null);
    setEndDateTemp(endDate ? dayjs(endDate) : null);
    setDateFilterOpen(true);
  };

  const handleCloseDateFilter = () => {
    setDateFilterOpen(false);
  };

  const handleApplyDateFilter = () => {
    const newStartDate = startDateTemp?.toDate() || null;
    const newEndDate = endDateTemp?.toDate() || null;

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    handleCloseDateFilter();
  };

  const handleClearDateFilter = () => {
    setStartDateTemp(null);
    setEndDateTemp(null);
    setStartDate(null);
    setEndDate(null);
  };

  // Các handlers khác giữ nguyên
  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    order: OrderDto
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleSubmitSearch = () => {
    setSearchOrderQuery(searchOrder);
  };

  const handleSearchOrderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchOrder(event.target.value);
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
          Danh sách đơn hàng
        </Typography>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="">
            <SearchInputComponent
              icon={<CiSearch />}
              onChange={(e) => handleSearchOrderChange(e)}
              onSeachClick={handleSubmitSearch}
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
                height: "50px",
                textTransform: "capitalize",
                borderRadius: "8px",
              }}
            >
              {activeDateFilter
                ? `${formatDateForDisplay(
                    startDateTemp
                  )} - ${formatDateForDisplay(endDateTemp)}`
                : "Lọc theo ngày"}
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Trạng thái :</span>
            <DropdownButton
              options={stateStatus}
              currentOption={orderStatusCurrent.label}
              defaultOption={stateStatus[0]}
              onOptionSelect={(option) => setOrderStatusCurrent(option)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Sắp xếp :</span>
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
              <TableCell sx={{ width: "50px" }}>STT</TableCell>
              <TableCell>Mã Đơn</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Phương thức</TableCell>
              <TableCell>Thanh toán</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Dòng thời gian</TableCell>
              <TableCell align="right">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!isFetching &&
              !isLoading &&
              ordersResponse &&
              ordersResponse.data &&
              ordersResponse?.data.map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "#F8FAFC" },
                  }}
                >
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell>#{row.id}</TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {row.user.firstName} {row.user.lastName}
                  </TableCell>
                  <TableCell sx={{ color: "#64748B" }}>
                    {formatDate(row.createdAt.toString())}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {row.orderDetails.length}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "medium" }}>
                    {row.total}
                  </TableCell>
                  <TableCell>
                    <PaymentMethodBadge paymentMethod={row.paymentMethod} />
                  </TableCell>
                  <TableCell>
                    <PaymentStatusBadge status={row.paymentStatus} />
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={row.status} />
                  </TableCell>

                  <TableCell>
                    <div className="relative pl-4">
                      {getOrderTimeline(row).map(
                        (event, index) =>
                          index === getOrderTimeline(row).length - 1 && (
                            <div key={index} className="flex items-start mb-4">
                              <div className="absolute left-0 w-px h-full bg-gray-200" />
                              <div className="flex items-center">
                                <div
                                  className={`absolute left-0 w-2 h-2 -ml-1 ${event.color} rounded-full`}
                                />
                                <div className="">
                                  <p className="text-[12px] font-medium">
                                    {event.status}
                                  </p>
                                  <p className="text-[10px] text-gray-500">
                                    {formatDateTime(event.date.toString())}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, row)}
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
        {(isLoading || isFetching) && (
          <div className="flex h-[720px] items-center justify-center w-full">
            <LoadingComponent />
          </div>
        )}

        {!ordersResponse?.data ? (
          <div className="flex h-[720px] font-medium flex-col items-center gap-6 justify-center w-full">
            <span className="text-red-500">
              Không thể tải dữ liệu về danh sách đơn hàng
            </span>
            <div
              onClick={refetch}
              className="h-[50px] cursor-pointer bg-red-50 flex items-center justify-center rounded-lg px-6 text-red-500"
            >
              Tải lại dữ liệu
            </div>
          </div>
        ) : ordersResponse.data.length === 0 ? (
          <div className="flex h-[720px] font-medium opacity-60 flex-col items-center gap-6 justify-center w-full">
            <div className="text-[100px]">
              <BsBoxSeam />
            </div>
            <span>Danh sách đơn hàng trống</span>
          </div>
        ) : null}
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={ordersResponse?.pagination?.totalPage}
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
        <MenuItem
          onClick={() => {
            setIsOpenOrderDetail((prev) => !prev);
            setAnchorEl(null);
          }}
          sx={{ color: "#334155" }}
        >
          <VisibilityOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Xem chi tiết
        </MenuItem>
        <MenuItem onClick={() => {}} sx={{ color: "#334155" }}>
          <EditOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Cập nhật
        </MenuItem>
        <Divider sx={{ my: 1 }} />
        <MenuItem onClick={() => {}} sx={{ color: "#EF4444" }}>
          <DeleteOutlineOutlinedIcon fontSize="small" sx={{ mr: 1.5 }} />
          Xóa
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
            Lọc đơn hàng theo ngày
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                paddingY: "24px",
              }}
            >
              <DatePicker
                label="Ngày bắt đầu"
                value={startDateTemp}
                onChange={(newValue) => setStartDateTemp(newValue)}
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
                label="Ngày kết thúc"
                value={endDateTemp}
                onChange={(newValue) => setEndDateTemp(newValue)}
                minDate={startDateTemp || undefined}
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
            <Button
              onClick={handleClearDateFilter}
              sx={{ color: "#64748B", textTransform: "capitalize" }}
            >
              Đặt lại
            </Button>
            <Button
              onClick={handleCloseDateFilter}
              sx={{ color: "#64748B", textTransform: "capitalize" }}
            >
              Hủy
            </Button>
            <Button
              onClick={handleApplyDateFilter}
              variant="contained"
              sx={{
                bgcolor: "#1E40AF",
                textTransform: "capitalize",
                "&:hover": {
                  bgcolor: "#1E3A8A",
                },
              }}
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>

      {isOpenOrderDetail && (
        <>
          <OrderDetailModal
            open={!!selectedOrder}
            onClose={() => {
              setSelectedOrder(null);
              setIsOpenOrderDetail((prev) => !prev);
            }}
            order={selectedOrder!}
            onCancelOrder={() => setShowCancelModal(true)}
          />
        </>
      )}

      <OrderCancelModel
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirmCancel={handleCancelOrder}
        orderId={selectedOrder?.id ?? 0}
      />
    </Box>
  );
};

export default AdminOrders;
