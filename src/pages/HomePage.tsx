import {
  BrandSection,
  HeroSection,
  TestimonialSection,
} from "@sections/homePage";

const HomePage = () => {
  return (
    <main className="">
      <section>
        <HeroSection />
      </section>
      <section>
        <BrandSection />
      </section>
      <section className="h-[1000px]"></section>
      <section>
        <TestimonialSection />
      </section>
    </main>
  );
};

export default HomePage;
