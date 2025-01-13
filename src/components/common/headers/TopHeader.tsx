import { Link } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";

const TopHeader = () => {
  return (
    <div className="h-10 font-semibold text-[10px] justify-between uppercase bg-primary-900 items-center text-white px-4 sm:px-[2vw] md:px-[4vw] lg:px-[5vw] xl:px-[6vw] flex flex-row">
      <div className="flex items-center gap-3">
        <span className="font-medium">fall winter collection 2024</span>
        <div className="h-5 w-[2px] bg-white"></div>
        <div>
          <Link to={"/"} className="font-bold">
            Shop now
          </Link>
        </div>
      </div>
      <div className="items-center hidden gap-3 cursor-pointer lg:flex">
        <div className="flex items-center gap-1">
          <StorefrontIcon
            sx={{
              fontSize: 20,
              marginTop: "-2px",
            }}
          />
          <span>tìm của hàng</span>
        </div>
        <div className="h-5 w-[1.5px] bg-white"></div>
        <div>support</div>
      </div>
    </div>
  );
};

export default TopHeader;
