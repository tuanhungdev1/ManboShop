import { PrimaryButton } from "@components/buttons";

import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      Home Page
      <div>
        <Link to={"/account/register"}>
          <PrimaryButton variant="contained">Register</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
