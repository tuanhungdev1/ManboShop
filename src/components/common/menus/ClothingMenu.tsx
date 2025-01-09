import { clothingMenu } from "@constants/menus/clothingMenu";
import { Link } from "react-router-dom";

const ClothingMenu = () => {
  return (
    <div className="flex items-center gap-6 uppercase text-[14px] font-medium">
      {clothingMenu.map((menuItem) => (
        <Link to={menuItem.path} key={menuItem.id}>
          <span>{menuItem.title}</span>
        </Link>
      ))}
    </div>
  );
};

export default ClothingMenu;
