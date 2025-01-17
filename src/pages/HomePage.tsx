import { PrimaryButton } from "@components/buttons";
import { AnnouncementMarquee } from "@components/common/menus";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <AnnouncementMarquee />
      <div className="pt-[130px] px-4 sm:px-[2vw] md:px-[4vw] lg:px-[5vw] xl:px-[6vw] flex flex-col">
      <div>
        <Link to={"/account/register"}>
          <PrimaryButton variant="contained">Register</PrimaryButton>
        </Link>
        <br />
        <Link to={"/collection/san-pham-moi"}>
          <PrimaryButton variant="contained">Collection</PrimaryButton>
        </Link>
      </div>
      </div>
      
    </div>
  );
};

export default HomePage;
