import { PrimaryButton } from "@components/buttons";


import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div className="">
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
