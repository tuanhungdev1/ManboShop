interface ClothingMenu {
  id: number;
  title: string;
  path: string; // Add a path property for navigation
}

export const clothingMenu: ClothingMenu[] = [
  { id: 1, title: "Trang phục", path: "/trang-phuc" },
  { id: 2, title: "Phụ kiện", path: "/phu-kien" },
  { id: 3, title: "Đồ da", path: "/do-da" },
];
