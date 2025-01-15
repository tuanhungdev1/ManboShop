export interface FilterState {
  brands: string[];
  colors: string[];
  productTypes: string[];
}

export const BRANDS = [
  { id: "aristino", label: "Aristino" },
  { id: "aristino-golf", label: "Aristino Golf" },
  { id: "aristino-business", label: "Aristino Business" },
];

export const COLORS = [
  { id: "white", label: "Trắng", code: "#FFFFFF" },
  { id: "red", label: "Đỏ", code: "#FF4D4F" },
  { id: "green", label: "Xanh lá", code: "#1B5E20" },
  { id: "brown", label: "Nâu", code: "#795548" },
  { id: "mint", label: "Xanh bạc hà", code: "#E0F2F1" },
  { id: "beige", label: "Be", code: "#E1C699" },
  { id: "grey", label: "Xám đậm", code: "#424242" },
  { id: "lightgrey", label: "Xám nhạt", code: "#9E9E9E" },
];

export const PRODUCT_TYPES = [
  { id: "shirt", label: "Áo Sơ mi" },
  { id: "polo", label: "Áo Polo" },
  { id: "windbreaker", label: "Áo khoác chắn bóng" },
  { id: "short-sleeve-shirt", label: "Áo Sơ mi ngắn tay" },
  { id: "long-sleeve-shirt", label: "Áo Sơ mi dài tay" },
  { id: "double-layer-jacket", label: "Áo khoác hai lớp" },
  { id: "sweater", label: "Áo len dài tay" },
  { id: "thermal", label: "Áo giữ nhiệt" },
  { id: "long-sleeve-tee", label: "Áo thun tay dài" },
];
