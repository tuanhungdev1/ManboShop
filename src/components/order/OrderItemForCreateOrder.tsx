import { CartItem } from "@types-d/cart";
import { formatPrice } from "@utils/format";

interface OrderItemForCreateOrderProps {
  cartItem: CartItem;
}

const OrderItemForCreateOrder: React.FC<OrderItemForCreateOrderProps> = ({
  cartItem,
}) => {
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

  const firstImage =
    variantData?.variantDetails && Array.isArray(variantData.variantDetails)
      ? variantData.variantDetails.find((item) => item.imageUrl!.length > 0)
          ?.imageUrl?.[0] ?? null
      : null;
  return (
    <>
      <div className="flex py-8 border-b relative items-stretch">
        <div className="flex items-center flex-1">
          <div>
            <img
              src={
                firstImage?.imageUrl ?? // Add optional chaining for array access
                "https://via.placeholder.com/100"
              }
              alt={cartItem.product.name}
              style={{ width: 100, height: 100, marginRight: 16 }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-medium text-sm">
                {cartItem.product.name}
              </span>
            </div>
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
      </div>
    </>
  );
};

export default OrderItemForCreateOrder;
