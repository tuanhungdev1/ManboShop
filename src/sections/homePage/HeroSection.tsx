import { Counter } from "@components/counter";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-gray-50 xl:h-screen select-none relative">
      <div className="w-full h-full relative xl:flex xl:flex-row container mx-auto px-4">
        <div className="flex  md:text-center xl:text-left items-center xl:items-start flex-1 w-full flex-col relative gap-6 md:gap-10 pt-[270px]">
          <p
            className="text-6xl md:px-16 md:text-7xl  xl:px-0 2xl:text-[70px] text-wrap uppercase font-extrabold"
            style={{
              lineHeight: 1.2,
            }}
          >
            tìm trang phục phù hợp với phong cách của bạn
          </p>
          <span className="text-black xl:text-left xl:px-0 text-center md:px-[100px] font-medium text-base opacity-50 mt-2">
            Khám phá bộ sưu tập quần áo được thiết kế tinh tế, giúp bạn thể hiện
            cá tính và phong cách riêng.
          </span>
          <Link to={"/collection"} className="mt-2">
            <div className="rounded-full py-4 hover:shadow-2xl font-medium transition-all duration-300 bg-black w-[240px] text-white flex items-center justify-center">
              Mua ngay
            </div>
          </Link>

          <div className="flex mt-10 w-full xl:items-stretch xl:text-left xl:justify-start flex-col md:flex-row items-center justify-center text-center gap-5 2xl:gap-10 xl:gap-8 lg:gap-4 md:gap-12">
            <div className="flex flex-col justify-start gap-3">
              <Counter target={200} />
              <span className="xl:text-[13px] 2xl:text-[15px] opacity-70">
                Thương hiệu quốc tế
              </span>
            </div>
            <div className="w-[2px] h-full bg-gray-200 ml-4 mr-4"></div>
            <div className="flex flex-col gap-3">
              <Counter target={2000} />
              <span className="xl:text-[13px] 2xl:text-[15px] opacity-70">
                Sản phẩm chất lượng cao
              </span>
            </div>
            <div className="w-[2px] bg-gray-200 ml-4 mr-4"></div>
            <div className="flex flex-col justify-start gap-3">
              <Counter target={30000} />
              <span className="xl:text-[13px] 2xl:text-[15px] opacity-70">
                Khách hàng hài lòng
              </span>
            </div>
          </div>

          <div className="absolute top-[240px] xl:top-[220px] right-10 xl:right-[50px] md:right-[0px] scale-75">
            <img src={"/public/Vector.png"} alt="" />
          </div>
          <div className="absolute top-[120px] right-[80px]">
            <img src={"/public/Vector2.png"} alt="" />
          </div>
        </div>
        <div className="flex-1 xl:block h-[800px] lg:h-[700px] md:pb-[300px] mt-[50px] md:mt-[140px] lg:mt-[200px] xl:mt-0 xl:pt-[100px] w-full relative xl:h-full flex items-center justify-center">
          <img
            src={"/public/hero.svg"}
            alt="Hình ảnh chính"
            className="xl:absolute md:w-auto 2xl:bottom-0 xl:bottom-24 right-0 lg:bottom-24 xl:w-full lg:scale-100 object-cover 2xl:scale-90"
          />
          <div className="absolute md:left-[140px] xl:hidden top-[200px] xl:top-[220px] left-6 xl:right-[0px] scale-75">
            <img src={"/public/Vector.png"} alt="" />
          </div>
          <div className="absolute xl:hidden md:left-[200px] hidden lg:block top-[40px] xl:top-[220px] left-6 xl:right-[0px] scale-75">
            <img src={"/public/Vector.png"} alt="" />
          </div>
          <div className="absolute md:right-[40px] lg:mr-[120px] top-[70px] md:-top-[100px] scale-75 right-[20px] lg:top-0 2xl:top-[110px] 2xl:right-[0px] xl:top-[130px] xl:right-[0px]">
            <img src={"/public/Vector2.png"} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
