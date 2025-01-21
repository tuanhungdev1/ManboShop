import { useAppSelector } from "@redux/hooks";

const Backdrop = () => {
  const { isVisible } = useAppSelector((state) => state.backdrop);

  return (
    <div
      className={`fixed inset-0 bg-black transition-opacity duration-500 ${
        isVisible ? "visible opacity-50" : "invisible opacity-0"
      }`}
      style={{ zIndex: 40 }}
    />
  );
};

export default Backdrop;
