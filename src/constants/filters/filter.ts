export interface FilterState {
  brands: string[];
  colors: string[];
  productTypes: string[];
}

export interface Color {
  id: string;
  label: string;
  code: string;
}

export const BRANDS = [
  { id: "aristino", label: "Aristino" },
  { id: "aristino-golf", label: "Aristino Golf" },
  { id: "aristino-business", label: "Aristino Business" },
];

export const COLORS: Color[] = [
  { id: "white", label: "Trắng", code: "#FFFFFF" },
  { id: "black", label: "Đen", code: "#000000" },
  { id: "red", label: "Đỏ", code: "#FF4D4F" },
  { id: "blue", label: "Xanh dương", code: "#2196F3" },
  { id: "green", label: "Xanh lá", code: "#1B5E20" },
  { id: "yellow", label: "Vàng", code: "#FFEB3B" },
  { id: "brown", label: "Nâu", code: "#795548" },
  { id: "mint", label: "Xanh bạc hà", code: "#E0F2F1" },
  { id: "beige", label: "Be", code: "#E1C699" },
  { id: "grey", label: "Xám đậm", code: "#424242" },
  { id: "lightgrey", label: "Xám nhạt", code: "#9E9E9E" },
  { id: "pink", label: "Hồng", code: "#FFC0CB" },
  { id: "purple", label: "Tím", code: "#9C27B0" },
  { id: "orange", label: "Cam", code: "#FF9800" },
  { id: "teal", label: "Xanh teal", code: "#009688" },
  { id: "cyan", label: "Xanh cyan", code: "#00BCD4" },
  { id: "navy", label: "Xanh navy", code: "#001F54" },
  { id: "olive", label: "Xanh ô-liu", code: "#808000" },
  { id: "gold", label: "Vàng gold", code: "#FFD700" },
  { id: "silver", label: "Bạc", code: "#C0C0C0" },
  { id: "peach", label: "Cam đào", code: "#FFDAB9" },
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
