import { Grid } from "@mui/material";
import ShoppingCartSummary from "./ShoppingCartSummary";
import { useAppSelector } from "@redux/hooks";
import {
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalItems,
} from "@redux/slices/cartSlice";
import ShoppingCartItem from "@components/cartItem/ShoppingCartItem";
import { TfiFaceSad } from "react-icons/tfi";

const ShoppingCartPage = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartItemCount = useAppSelector(selectCartTotalItems);
  const subTotal = useAppSelector(selectCartTotalAmount);
  const deliveryCharge = 5; // Phí giao hàng (ví dụ)
  const discount = 0; // Giảm giá (ví dụ)

  return (
    <div className="mt-[50px]">
      <div className="text-4xl font-medium mt-4 mb-12">Giỏ hàng</div>
      <Grid container spacing={4} marginTop={6}>
        <Grid
          item
          xs={12}
          lg={12}
          xl={9}
          sx={{
            overflowX: { xs: "auto", lg: "hidden" }, // Cuộn ngang trên màn hình nhỏ
            flexWrap: "nowrap", // Ngăn các mục xuống dòng khi màn hình nhỏ
          }}
        >
          {cartItemCount > 0 ? (
            <>
              <Grid container spacing={4} sx={{ flexWrap: "nowrap" }}>
                <Grid item xs={5} sx={{ minWidth: "400px" }}>
                  <div className="text-[14px] font-medium">Sản phẩm</div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    minWidth: "160px",
                    ["@media (min-width: 1200px)"]: {
                      minWidth: "unset",
                    },
                  }}
                >
                  <div className="text-[14px] font-medium">Giá</div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    minWidth: "200px",
                    ["@media (min-width: 1200px)"]: {
                      minWidth: "unset",
                    },
                  }}
                >
                  <div className="text-[14px] font-medium">Số lượng</div>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    minWidth: "160px",
                    ["@media (min-width: 1200px)"]: {
                      minWidth: "unset",
                    },
                  }}
                >
                  <div className="text-[14px] font-medium">Tạm tính</div>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{
                    minWidth: "160px",
                    ["@media (min-width: 1200px)"]: {
                      minWidth: "unset",
                    },
                  }}
                ></Grid>
              </Grid>
              {cartItems.map((item) => (
                <ShoppingCartItem key={item.id} cartItem={item} />
              ))}
            </>
          ) : (
            <div className="text-center text-gray-500 mt-20 mb-20 flex flex-col items-center justify-center">
              <div className="text-[60px] mb-6 opacity-50">
                <TfiFaceSad />
              </div>
              <span>Giỏ hàng của bạn đang trống.</span>
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <ShoppingCartSummary
            subtotal={subTotal}
            deliveryCharge={deliveryCharge}
            discount={discount}
            onApplyDiscount={() => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ShoppingCartPage;
