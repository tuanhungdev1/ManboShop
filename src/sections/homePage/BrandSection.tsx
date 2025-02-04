import brands from "@constants/mokeData/brands";

const BrandSection = () => {
  return (
    <div className="relative flex overflow-hidden h-[160px] bg-white">
      <div className="flex animate-marquee items-center">
        {[...brands, ...brands].map((item, index) => (
          <div
            key={index}
            className="flex items-center mr-[100px] justify-center w-[160px] cursor-pointer"
          >
            <img src={item.imageUrl} alt={item.name} className="w-[140px]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
