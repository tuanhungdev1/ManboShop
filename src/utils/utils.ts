import { Product } from "@types-d/product";

export const slugify = (str: string): string => {
  str = str.toLowerCase();
    
    // Chuyển đổi các ký tự có dấu thành không dấu
    str = str.normalize('NFD')
             .replace(/[\u0300-\u036f]/g, '');
    
    // Thay thế khoảng trắng bằng dấu gạch ngang
    str = str.replace(/\s+/g, '-');
    
    // Loại bỏ các ký tự đặc biệt
    str = str.replace(/[^a-z0-9-]/g, '');
    
    // Loại bỏ các dấu gạch ngang liên tiếp
    str = str.replace(/-+/g, '-');
    
    // Loại bỏ dấu gạch ngang ở đầu và cuối
    str = str.replace(/^-+|-+$/g, '');
    
    return str;
}; 


export const isNewProduct = (product: Product) => {
  const currentDate = new Date().getTime(); // Get timestamp
  if (product.createdAt) {
    const createdDate = new Date(product.createdAt).getTime();
    const daysDifference = (currentDate - createdDate) / (1000 * 60 * 60 * 24);
    return daysDifference <= 30;
  }
  return false;
};