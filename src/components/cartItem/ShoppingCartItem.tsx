import { Grid } from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "@utils/format";
import { CartItem } from "@types-d/cart";
import { Link } from "react-router-dom";
import { slugify } from "@utils/utils";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useAppDispatch } from "@redux/hooks";
import {
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "@services/cartApi";
import { ImageLoad } from "@components/images";

interface ShoppingCartItemComponentProps {
  cartItem: CartItem;
}

const ShoppingCartItem: React.FC<ShoppingCartItemComponentProps> = ({
  cartItem,
}) => {
  const [removeCartItem, { data }] = useRemoveCartItemMutation();
  const dispatch = useAppDispatch();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleQuantityChange = async (newQuantity: number) => {
    try {
      await updateCartItem({
        itemId: cartItem.id,
        cartItem: { quantity: newQuantity },
      }).unwrap();

      dispatch(
        openSnackbar({
          type: "success",
          message: "Cập nhật số lượng sản phẩm thành công!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            error.data.Message || "Không thể cập nhật số lượng sản phẩm!",
        })
      );
    }
  };
  const getVariantDetails = (cartItem: CartItem) => {
    const skuToFind = cartItem.sku;

    const variantValue = cartItem.product.variantValues.find(
      (v) => v.sku === skuToFind
    );

    if (!variantValue) return null;

    const variantDetails = cartItem.product.variants.map((variant) => {
      const matchedValue = variant.values.find((v) =>
        skuToFind.includes(v.id.toString())
      );

      return {
        name: variant.name,
        value: matchedValue?.value || "Không xác định",
        imageUrl: matchedValue?.variantValueImages || null,
      };
    });

    return {
      ...variantValue,
      variantDetails,
    };
  };

  const variantData = getVariantDetails(cartItem);

  const handleRemoveCartItem = async (event: React.MouseEvent) => {
    event.stopPropagation();

    try {
      await removeCartItem(cartItem.id).unwrap();

      dispatch(
        openSnackbar({
          type: "success",
          message: data?.message || "Xóa thành công 1 sản phẩm trong giỏ hàng!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            error.data.Message || "Không thể xóa sản phẩm trong giỏ hàng!",
        })
      );
    }
  };

  const firstImage =
    variantData?.variantDetails && Array.isArray(variantData.variantDetails)
      ? variantData.variantDetails.find((item) => item.imageUrl!.length > 0)
          ?.imageUrl?.[0] ?? null
      : null;
  return (
    <Grid
      container
      spacing={4}
      paddingY={4}
      sx={{
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        xs={5}
        sx={{
          minWidth: "400px",
          ["@media (min-width: 1200px)"]: {
            minWidth: "unset",
          },
        }}
      >
        <div className="flex items-center flex-1">
          <Link to={`/product/${slugify(cartItem.product.name)}`}>
            <ImageLoad
              src={firstImage?.imageUrl || "https://via.placeholder.com/100"}
              alt={cartItem.product.name}
              className="w-[80px] h-[80px] mr-[16px]"
            />
          </Link>
          <div className="flex flex-col gap-2">
            <Link to={`/product/${slugify(cartItem.product.name)}`}>
              <span className="font-medium text-sm">
                {cartItem.product.name}
              </span>
            </Link>
            <div className="text-[16px] font-bold hidden xl:block">
              {cartItem.quantity} x {formatPrice(cartItem.price)}
            </div>
            <div className="flex gap-2 items-center">
              {variantData?.variantDetails.map((variant) => (
                <span key={variant.name} className="font-medium text-sm">
                  {variant.name}: {variant.value}
                </span>
              ))}
            </div>
          </div>
        </div>
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
        <div className="text-[14px] font-medium flex flex-col justify-center w-full h-full">
          {formatPrice(cartItem.price)}
        </div>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          minWidth: "200px",
          lg: {
            minWidth: "0",
          },
        }}
      >
        <div className="text-[14px] font-medium flex flex-col justify-center w-full h-full">
          <QuantitySelector
            quantity={cartItem.quantity}
            onChange={handleQuantityChange}
          />
        </div>
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
        <div className="text-[14px] font-medium flex flex-col justify-center w-full h-full">
          {formatPrice(cartItem.quantity * cartItem.price)}
        </div>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          minWidth: "100px",
          ["@media (min-width: 1200px)"]: {
            minWidth: "unset",
          },
        }}
      >
        <div
          onClick={handleRemoveCartItem}
          className="text-[26px] cursor-pointer flex flex-col justify-center w-full h-full text-red-500 opacity-60 hover:opacity-100 transition-all duration-200"
        >
          <MdOutlineDelete />
        </div>
      </Grid>
    </Grid>
  );
};

export default ShoppingCartItem;
