import { Link } from "react-router-dom";
import PolicyList from "./PolicyList";
import SocialMediaList from "./SocialMediaList";
import { EmailInput } from "@components/formInputs";

const Footer = () => {
  return (
    <div>
      <PolicyList />
      <div className="w-screen bg-primary-900  text-white flex sm:px-[2vw] md:px-[4vw] lg:px-[5vw] xl:px-[6vw]">
        {/* LEFT FOOTER */}
        <div className="flex-1 ">
          <div className="flex flex-col text-[13px] items-start flex-1 px-[60px] py-[56px] border-white border-x">
            <div>
              <div className="flex">
                <div>
                  <img
                    src="https://file.hstatic.net/200000886795/file/logo-kgvietnam-doc.png"
                    alt="logo"
                    width={100}
                  />
                </div>

                <div className="flex flex-col gap-2 ml-[25px]">
                  <span className="text-[13px] font-medium">
                    CÔNG TY CỔ PHẦN ĐẦU TƯ K&G VIỆT NAM
                  </span>
                  <span className="opacity-80">
                    Trụ sở chính: Tầng 11 khối A, tòa nhà Sông Đà, Đường Phạm
                    Hùng, Phường Mỹ Đình 1, Quận Nam Từ Liêm, Hà Nội, Việt Nam
                  </span>
                  <span className="opacity-80">Mã số thuế: 0105911105.</span>
                  <span className="opacity-80">
                    Chi Nhánh:84 Nguyễn Trãi, Phường 03, Quận 5, Hồ Chi Minh,
                    Việt Nam.
                  </span>
                </div>
              </div>

              <div className="pt-[72px] gap-2 w-full flex flex-col">
                <span className="text-[14px] font-medium uppercase">
                  Đăng ký nhận tin điện tử
                </span>

                <span className="block opacity-80">
                  Hãy nhập email của bạn để nhận những tin tức mới nhất của
                  chúng tôi
                </span>

                {/* INPUT EMAIL */}
                <div className="mt-5 mb-5">
                  <EmailInput />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-medium uppercase">
                    <span>Theo dõi chúng tôi</span>
                    <div>
                      <SocialMediaList />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>HOTLINE:</span>
                    <span className="text-[20px]">18006226</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-[36px] pb-[60px] border-t border-x w-full flex items-center justify-between px-[60px]">
            <div className="font-semibold text-[13px]">
              Bản quyền © 2024 KGVIETNAM
            </div>
            <Link
              to={
                "http://online.gov.vn/Home/WebDetails/27344?AspxAutoDetectCookieSupport=1"
              }
              target="_blank"
            >
              <img
                src="http://online.gov.vn/Content/EndUser/LogoCCDVSaleNoti/logoSaleNoti.png"
                alt=""
                width={130}
              />
            </Link>
          </div>
        </div>

        {/* RIGHT FOOTER */}
        <div className="flex-1 border-white border-r-[1px] "></div>
      </div>

      {/* COPPY RIGHT */}

      <div className="py-4 font-medium text-center bg-white">
        <span>
          &copy; {new Date().getFullYear()} ARISTINO. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
