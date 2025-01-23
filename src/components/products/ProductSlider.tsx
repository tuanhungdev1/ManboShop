import { useRef } from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { Product } from "@types-d/product";
import ProductSkeleton from "./ProductSkeleton";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

interface ProductSliderProps {
  title?: string;
  products: Product[];
  viewMode: "grid" | "list";
}

const ProductSlider = ({
  products,
  viewMode,
  title = "",
}: ProductSliderProps) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: () => {
      // Prevent default product click when dragging
      document.body.style.pointerEvents = "none";
    },
    afterChange: () => {
      // Restore pointer events after slide change
      document.body.style.pointerEvents = "auto";
    },
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  if (!products || products.length === 0) {
    return (
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1"
        } gap-6`}
      >
        {[...Array(4)].map((_, index) => (
          <ProductSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-10 px-[10px]">
        <h1 className="text-2xl font-semibold select-none">{title}</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={previous}
            className="w-10 h-10 border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200 ease-in rounded"
          >
            <IoIosArrowRoundBack size={24} />
          </button>

          <button
            onClick={next}
            className="w-10 h-10 border-[2px] border-black flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200 ease-in rounded"
          >
            <IoIosArrowRoundForward size={24} />
          </button>
        </div>
      </div>
      <div className="relative">
        <Slider ref={sliderRef} {...settings} className="pb-6">
          {products.slice(0, 10).map((product) => (
            <div key={product.id} className="px-2">
              <ProductCard product={product} viewMode={viewMode} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ProductSlider;
