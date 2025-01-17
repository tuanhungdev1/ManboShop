import { RootState } from "@redux/store";
import { useSelector } from "react-redux";

const Backdrop = () => {
  const { isVisible, opacity, zIndex } = useSelector(
    (state: RootState) => state.backdrop
  );

  console.log(zIndex);

  return (
    <div
      className={`fixed inset-0 top-0 z-40 transition-all duration-300 bg-black ${
        isVisible ? "visible" : "invisible"
      }`}
      style={{
        opacity: isVisible ? opacity : 0,
        zIndex,
      }}
    />
  );
};

export default Backdrop;
