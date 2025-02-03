export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  review: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Model",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    review:
      "Tôi rất ấn tượng với chất lượng sản phẩm. Chất liệu vải mềm mại, Đường may chắc chắn, không có lỗi. Giao hàng rất nhanh, đóng gói cẩn thận. Tôi đã thử giặt vài lần và màu sắc vẫn giữ nguyên, không bị phai hay nhăn nhúm.",
  },
  {
    id: 2,
    name: "Jacob Jones",
    role: "Co-Founder",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    review:
      "Tôi đã sử dụng sản phẩm này trong một thời gian dài và rất hài lòng với độ bền của nó. Vải không bị xù lông, đường may tinh tế, không bung chỉ. Tôi thường xuyên mặc đi làm, đi chơi, và nhận được nhiều lời khen về thiết kế sang trọng, hiện đại. Hoàn toàn đáng tiền!",
  },
  {
    id: 3,
    name: "Jenny Wilson",
    role: "Fashion Designer",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    review:
      "Tôi đã mua sản phẩm này vì yêu thích thiết kế, nhưng sau khi nhận hàng, tôi càng bất ngờ hơn với chất lượng thực tế. sản phẩm vẫn giữ nguyên form dáng. Tôi sẽ giới thiệu cho bạn bè vì đây là một sản phẩm rất đáng mua.",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    review:
      "Tôi rất hài lòng với sản phẩm này. Đầu tiên, thiết kế cực kỳ hiện đại và hợp xu hướng. Tôi đã mua sản phẩm này để làm quà tặng. Điểm đặc biệt là chất liệu không bị nhăn nhiều. Dịch vụ chăm sóc khách hàng cũng rất nhiệt tình, phản hồi nhanh chóng.",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    role: "Marketing Specialist",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    review:
      "Sản phẩm thực sự vượt mong đợi của tôi. Chất lượng vải mềm mịn, không gây khó chịu khi mặc cả ngày. Đường may rất chắc chắn. Ngoài ra, giao hàng nhanh hơn dự kiến, đóng gói cẩn thận. Tôi đã giới thiệu sản phẩm này cho đồng nghiệp và ai cũng khen ngợi.",
  },
  {
    id: 6,
    name: "David Anderson",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 5,
    review:
      "Tôi rất hài lòng với chất lượng sản phẩm này. Khi đặt hàng, tôi hơi lo lắng về màu sắc thực tế có giống hình không, nhưng khi nhận hàng, tôi hoàn toàn yên tâm. Màu sắc chuẩn, Đặc biệt, sản phẩm rất dễ bảo quản, không bị nhăn nhiều sau khi giặt.",
  },
  {
    id: 7,
    name: "Emily Carter",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    rating: 5,
    review:
      "Sản phẩm có thiết kế rất đẹp, phù hợp với nhiều phong cách khác nhau. Tôi rất thích cách mà vải ôm nhẹ nhưng không gây cảm giác khó chịu. Một điểm trừ nhỏ là cửa hàng chưa có nhiều lựa chọn màu sắc, nhưng bù lại chất lượng cực kỳ tốt. ",
  },
  {
    id: 8,
    name: "Daniel White",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    rating: 5,
    review:
      "Tôi rất hài lòng với sản phẩm này! Thiết kế vô cùng độc đáo và mang lại cảm giác thời trang khi mặc. Tôi thường xuyên mặc khi đi chụp ảnh, và nhiều khách hàng của tôi cũng hỏi về sản phẩm. Tôi chắc chắn sẽ tiếp tục mua thêm sản phẩm khác từ cửa hàng này.",
  },
  {
    id: 9,
    name: "Sophia Martinez",
    role: "Blogger",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    rating: 5,
    review:
      "Sau khi thử nhiều thương hiệu khác nhau, tôi quyết định chọn sản phẩm này vì thiết kế đẹp mắt và giá cả hợp lý. Khi nhận hàng, tôi rất ấn tượng với cách đóng gói chuyên nghiệp. Sản phẩm mặc rất thoải mái. Tôi đã giới thiệu cho nhiều người và ai cũng hài lòng.",
  },
  {
    id: 10,
    name: "Chris Thompson",
    role: "Fitness Coach",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    rating: 5,
    review:
      "Là một huấn luyện viên thể hình, tôi rất quan tâm đến sự thoải mái khi mặc đồ trong thời gian dài. Sản phẩm này đáp ứng tất cả yêu cầu của tôi. không gây nóng bức khi vận động. Tôi đã thử giặt nhiều lần và chất liệu vẫn giữ nguyên trạng thái ban đầu.",
  },
];
