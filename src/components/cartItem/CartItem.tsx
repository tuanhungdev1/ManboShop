import { MdDeleteOutline } from "react-icons/md";
import { CartItem } from "@types-d/cart";
import React from "react";
import { formatPrice } from "@utils/format";
import { useRemoveCartItemMutation } from "@services/cartApi";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { Link } from "react-router-dom";
import { slugify } from "@utils/utils";

interface CartItemComponentProps {
  cartItem: CartItem;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({ cartItem }) => {
  const [removeCartItem, { data }] = useRemoveCartItemMutation();
  const dispatch = useAppDispatch();
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
        imageUrl: matchedValue?.imageUrl || null,
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

  return (
    <>
      <div className="flex py-8 border-b relative items-stretch">
        <div className="flex items-center flex-1">
          <Link to={`/product/${slugify(cartItem.product.name)}`}>
            <img
              src={
                variantData?.variantDetails.find((v) => v.imageUrl)?.imageUrl ||
                "https://via.placeholder.com/100"
              }
              alt={cartItem.product.name}
              style={{ width: 100, height: 100, marginRight: 16 }}
            />
          </Link>
          <div className="flex flex-col gap-2">
            <Link to={`/product/${slugify(cartItem.product.name)}`}>
              <span className="font-medium text-sm">
                {cartItem.product.name}
              </span>
            </Link>
            <div className="text-[16px] font-bold">
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
        <div
          onClick={(e) => handleRemoveCartItem(e)}
          className="cursor-pointer flex flex-col justify-end text-[26px] text-red-500 transition-all duration-200 opacity-60 hover:opacity-100"
        >
          <MdDeleteOutline />
        </div>
      </div>
    </>
  );
};

export default CartItemComponent;
