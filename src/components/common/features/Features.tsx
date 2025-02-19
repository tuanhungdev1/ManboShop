import {
  FiBox,
  FiDollarSign,
  FiHeadphones,
  FiCreditCard,
} from "react-icons/fi";

const Features = () => {
  const features = [
    {
      icon: <FiBox className="w-8 h-8" />,
      title: "Miễn phí vận chuyển",
      description: "Miễn phí vận chuyển cho đơn hàng trên $150",
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Đảm bảo hoàn tiền",
      description: "Đổi trả trong vòng 30 ngày",
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "Hỗ trợ trực tuyến",
      description: "24 giờ một ngày, 7 ngày một tuần",
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Thanh toán linh hoạt",
      description: "Thanh toán bằng nhiều loại thẻ tín dụng",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start "
          >
            <div className="text-primary-900">{feature.icon}</div>
            <h3 className="text-lg mt-4 font-extrabold text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-700 mt-2 font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
