import { PrimaryButton } from "@components/buttons";
import { TestimonialSection } from "@sections/homePage";

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
          <Link to={"/collection"}>
            <PrimaryButton variant="contained">Collection</PrimaryButton>
          </Link>
        </div>
      </div>
      <section>
        <TestimonialSection />
      </section>
    </div>
  );
};

export default HomePage;
