import { Card, Radio } from "@mui/material";

interface PaymentMethodCardProps {
  method: {
    id: number;
    label: string;
    icon: string;
  };
  selected: boolean;
  onSelect: () => void;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  method,
  selected,
  onSelect,
}) => {
  // Ánh xạ các biểu tượng phương thức thanh toán đến đường dẫn hình ảnh thực tế
  const getPaymentIcon = (iconName: string) => {
    const iconMap: { [key: string]: string } = {
      "cod-icon":
        "https://static.vecteezy.com/system/resources/previews/020/574/330/large_2x/cash-on-delivery-badge-pack-free-png.png",
      "zalopay-icon":
        "https://mir-s3-cdn-cf.behance.net/project_modules/disp/16823b123741383.60f52918409cc.jpg",
      "vnpay-icon":
        "https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg",
    };
    return iconMap[iconName];
  };

  return (
    <Card
      onClick={onSelect}
      className={` 
        relative
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-md
        p-4
        mb-4
        ${
          selected
            ? "border-2 border-black bg-blue-50"
            : "border border-gray-200"
        }
        rounded-xl
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 relative flex items-center justify-center">
            <img
              src={getPaymentIcon(method.icon)}
              alt={method.label}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-base text-gray-900">
              {method.label}
            </span>
            {method.id === 1 && (
              <span className="text-gray-500 text-sm">
                Thanh toán khi nhận hàng
              </span>
            )}
          </div>
        </div>

        <Radio
          checked={selected}
          onChange={onSelect}
          value={method.id}
          name="payment-method-radio"
          className={`${selected ? "text-blue-500" : "text-gray-400"}`}
        />
      </div>

      {/* Thông tin bổ sung dựa trên phương thức thanh toán */}
      {selected && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {method.id === 1 && (
            <div className="text-sm text-gray-600 flex flex-col gap-1 font-medium">
              <p>• Thanh toán bằng tiền mặt khi nhận hàng</p>
              <p>• Áp dụng trên toàn quốc</p>
              <p>• Miễn phí vận chuyển cho đơn hàng trên 50$</p>
            </div>
          )}
          {method.id === 2 && (
            <div className="text-sm text-gray-600 flex flex-col gap-1 font-medium">
              <p>• Thanh toán nhanh chóng và an toàn qua ZaloPay</p>
              <p>• Nhận hoàn tiền 5% cho lần thanh toán đầu tiên</p>
            </div>
          )}
          {method.id === 3 && (
            <div className="text-sm text-gray-600 flex flex-col gap-1 font-medium">
              <p>• Thanh toán an toàn qua cổng VNPay</p>
              <p>• Hỗ trợ tất cả các ngân hàng lớn tại Việt Nam</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PaymentMethodCard;
