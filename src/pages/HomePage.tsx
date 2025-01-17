import { PrimaryButton } from "@components/buttons";
import { AnnouncementMarquee } from "@components/common/menus";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <AnnouncementMarquee />
      Home Page
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
  );
};

export default HomePage;
