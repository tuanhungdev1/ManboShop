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
  { id: "trắng", label: "Trắng", code: "#FFFFFF" },
  { id: "đen", label: "Đen", code: "#000000" },
  { id: "đỏ", label: "Đỏ", code: "#FF4D4F" },
  { id: "xanh-dương", label: "Xanh dương", code: "#2196F3" },
  { id: "xanh-lá", label: "Xanh lá", code: "#1B5E20" },
  { id: "vàng", label: "Vàng", code: "#FFEB3B" },
  { id: "nâu", label: "Nâu", code: "#795548" },
  { id: "xanh-bạc-hà", label: "Xanh bạc hà", code: "#E0F2F1" },
  { id: "be", label: "Be", code: "#E1C699" },
  { id: "xám-đậm", label: "Xám đậm", code: "#424242" },
  { id: "xám-nhạt", label: "Xám nhạt", code: "#9E9E9E" },
  { id: "hồng", label: "Hồng", code: "#FFC0CB" },
  { id: "tím", label: "Tím", code: "#9C27B0" },
  { id: "cam", label: "Cam", code: "#FF9800" },
  { id: "xanh-teal", label: "Xanh teal", code: "#009688" },
  { id: "xanh-cyan", label: "Xanh cyan", code: "#00BCD4" },
  { id: "xanh-navy", label: "Xanh navy", code: "#001F54" },
  { id: "xanh-ô-liu", label: "Xanh ô-liu", code: "#808000" },
  { id: "vàng-gold", label: "Vàng gold", code: "#FFD700" },
  { id: "bạc", label: "Bạc", code: "#C0C0C0" },
  { id: "cam-đào", label: "Cam đào", code: "#FFDAB9" },
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

interface Size {
  id: string;
  label: string;
}

export const SIZES: Size[] = [
  { id: "XS", label: "XS" },
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
  { id: "XXL", label: "XXL" },
  { id: "29", label: "29" },
  { id: "30", label: "30" },
  { id: "31", label: "31" },
  { id: "32", label: "32" },
  { id: "33", label: "33" },
  { id: "34", label: "34" },
  { id: "35", label: "35" },
  { id: "38", label: "38" },
  { id: "39", label: "39" },
  { id: "40", label: "40" },
  { id: "41", label: "41" },
  { id: "42", label: "42" },
  { id: "43", label: "43" },
];
