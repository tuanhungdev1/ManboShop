export interface FooterItem {
  id: number;
  title: string;
  url: string;
}

export interface FooterSection {
  id: number;
  sectionTitle: string;
  links: FooterItem[];
}

export const footerSections: FooterSection[] = [
  {
    id: 1,
    sectionTitle: "Về Chúng Tôi",
    links: [
      { id: 1, title: "Giới thiệu Aristino", url: "/pages/ve-aristino" },
      {
        id: 2,
        title: "Cửa hàng gần bạn",
        url: "https://aristino.com/pages/he-thong-cua-hang",
      },
      { id: 3, title: "Ngôi Nhà Chung K&G", url: "https://ngoinhachung.vn" },
      { id: 4, title: "Tuyển dụng", url: "https://tuyendung.kgvietnam.com" },
      { id: 5, title: "Wear-Care-Share", url: "/blogs/ware-care-share-new" },
      { id: 6, title: "Tin tức", url: "/blogs/news" },
      { id: 7, title: "Nhà máy sản xuất", url: "/pages/nha-may-san-xuat" },
    ],
  },
  {
    id: 2,
    sectionTitle: "Chính Sách Bán Hàng",
    links: [
      { id: 1, title: "Đối tác affiliate", url: "/pages/doi-tac-affiliate" },
      { id: 2, title: "Hotline : 1800 6226", url: "/" },
      { id: 3, title: "Email: online@kgvietnam.com", url: "/" },
    ],
  },
  {
    id: 3,
    sectionTitle: "QUY ĐỊNH HOẠT ĐỘNG",
    links: [
      { id: 1, title: "Chính sách đổi hàng", url: "/pages/chinh-sach-doi-tra" },
      {
        id: 2,
        title: "Chính sách bảo hành",
        url: "/pages/chinh-sach-bao-hanh",
      },
      {
        id: 3,
        title: "Chính sách hội viên",
        url: "/pages/chinh-sach-hoi-vien",
      },
      {
        id: 4,
        title: "Chính sách giao nhận",
        url: "/pages/chinh-sach-giao-hang",
      },
      { id: 5, title: "Hướng dẫn mua hàng", url: "/pages/huong-dan-mua-hang" },
      { id: 6, title: "Chính sách bảo mật", url: "/pages/chinh-sach-bao-mat" },
    ],
  },
  {
    id: 4,
    sectionTitle: "DỊCH VỤ KHÁCH HÀNG",
    links: [
      { id: 1, title: "Trạng thái đơn hàng", url: "/" },
      { id: 2, title: "Câu hỏi thường gặp", url: "/pages/dieu-khoan-dich-vu" },
      {
        id: 3,
        title: "Chính sách hội viên",
        url: "/pages/chinh-sach-hoi-vien",
      },
      { id: 4, title: "Liên hệ 1800 6226", url: "/" },
    ],
  },
];
