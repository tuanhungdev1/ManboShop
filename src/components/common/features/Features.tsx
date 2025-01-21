import { FiBox, FiDollarSign, FiHeadphones, FiCreditCard } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiBox className="w-8 h-8" />,
      title: "Free Shipping",
      description: "Free shipping for order above $150"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Money Guarantee",
      description: "Within 30 days for an exchange"
    },
    {
      icon: <FiHeadphones className="w-8 h-8" />,
      title: "Online Support",
      description: "24 hours a day, 7 days a week"
    },
    {
      icon: <FiCreditCard className="w-8 h-8" />,
      title: "Flexible Payment",
      description: "Pay with multiple credit cards"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center md:items-start "
          >
            <div className="text-primary-900">
              {feature.icon}
            </div>
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