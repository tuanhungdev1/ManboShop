import { testimonials } from "@constants/mokeData/testimonial";
import { Avatar } from "@mui/material";
import { useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import Slider from "react-slick";

const TestimonialSection = () => {
  const reviewSliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,

    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: false,
    centerPadding: "60px",
    responsive: [
      {
        breakpoint: 1540,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: () => {
      document.body.style.pointerEvents = "none";
    },
    afterChange: () => {
      document.body.style.pointerEvents = "auto";
    },
  };

  const next = () => {
    reviewSliderRef.current?.slickNext();
  };

  const previous = () => {
    reviewSliderRef.current?.slickPrev();
  };

  return (
    <div className="bg-slate-50 py-[60px] select-none px-4 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl lg:text-3xl font-medium">
            What our Customer say's
          </h1>
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

        <div className="relative mt-14">
          <Slider ref={reviewSliderRef} {...settings} className="pb-6 h-full">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="px-7 h-[270px] relative flex mr-[10px] flex-col py-6 bg-white"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(item.rating)].map((_, index) => (
                      <div key={index} className="text-primary-500 text-2xl">
                        <FaStar />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm font-medium">{item.review}</span>
                </div>

                <div className="flex items-center gap-3 absolute bottom-6">
                  <div>
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      sx={{
                        width: "50px",
                        height: "50px",
                      }}
                    />
                  </div>

                  <div className="flex flex-col font-medium text-sm gap-1">
                    <span className="text-[16px] font-bold">{item.name}</span>
                    <span className="text-[12px] opacity-50">{item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
