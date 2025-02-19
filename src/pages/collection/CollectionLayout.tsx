import { Outlet } from "react-router-dom";

const CollectionLayout = () => {
  return (
    <div className="pt-[100px]">
      <Outlet />
    </div>
  );
};

export default CollectionLayout;
