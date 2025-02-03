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
    name: "Jacob Lee",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    rating: 5,
    review:
      "Tôi rất hài lòng với sản phẩm này. Chất liệu vải mát mẻ, thoải mái, rất phù hợp để mặc khi làm việc trong studio hoặc ngoài trời. Đặc biệt, sản phẩm vẫn giữ được hình dáng và màu sắc như lúc mới mua.",
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
  {
    id: 11,
    name: "Olivia Harris",
    role: "HR Manager",
    image: "https://randomuser.me/api/portraits/women/11.jpg",
    rating: 5,
    review:
      "Tôi rất ấn tượng với sản phẩm này. Mặc dù không phải là lần đầu tiên mua sản phẩm từ thương hiệu này, nhưng lần này tôi thực sự cảm thấy hài lòng về chất lượng. Đặc biệt, màu sắc rất tươi và vải không bị biến dạng sau khi giặt.",
  },
  {
    id: 12,
    name: "James Wilson",
    role: "Data Scientist",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    review:
      "Sản phẩm không chỉ đẹp mà còn rất bền. Tôi đã thử nhiều thương hiệu khác nhau nhưng vẫn chưa tìm được sản phẩm nào phù hợp như thế này. Vải mềm mại, thoáng mát, rất dễ chịu khi mặc cả ngày dài.",
  },
  {
    id: 13,
    name: "Grace Lee",
    role: "Consultant",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
    review:
      "Một sản phẩm tuyệt vời! Chất liệu vải mát mẻ và thoải mái, thiết kế rất trang nhã và dễ phối đồ. Tôi đã thử nhiều lần giặt nhưng sản phẩm vẫn không thay đổi hình dáng hay chất liệu. Rất đáng mua.",
  },
  {
    id: 14,
    name: "Ethan Wright",
    role: "Teacher",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    rating: 5,
    review:
      "Tôi yêu sản phẩm này! Chất liệu vải rất mịn và thoáng khí, rất phù hợp để mặc cả ngày dài mà không cảm thấy khó chịu. Thiết kế đẹp, vừa vặn và dễ dàng kết hợp với nhiều trang phục khác.",
  },
  {
    id: 15,
    name: "Ava Thomas",
    role: "Architect",
    image: "https://randomuser.me/api/portraits/women/13.jpg",
    rating: 5,
    review:
      "Sản phẩm này hoàn toàn vượt xa mong đợi của tôi. Chất liệu mềm mịn, không gây ngứa ngáy hay khó chịu. Dịch vụ giao hàng cũng rất nhanh chóng và sản phẩm được đóng gói cẩn thận.",
  },
  {
    id: 16,
    name: "Matthew Robinson",
    role: "Engineer",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    rating: 5,
    review:
      "Tôi cực kỳ hài lòng với sản phẩm này. Nó vừa vặn, thoải mái, và chất liệu rất bền. Mặc dù tôi đã thử giặt một vài lần, nhưng sản phẩm không hề bị xù lông hay mất màu.",
  },
  {
    id: 17,
    name: "Zoe Miller",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    rating: 5,
    review:
      "Một lựa chọn tuyệt vời cho những ai đang tìm kiếm sản phẩm chất lượng với giá hợp lý. Tôi đã mua sản phẩm này để chụp ảnh và nó rất thoải mái, màu sắc cũng rất đẹp. Rất đáng giá từng đồng.",
  },
  {
    id: 18,
    name: "Lucas Scott",
    role: "Chef",
    image: "https://randomuser.me/api/portraits/men/14.jpg",
    rating: 5,
    review:
      "Chất lượng sản phẩm thật sự rất tốt. Đặc biệt là khi mặc trong môi trường làm việc bận rộn, tôi không cảm thấy khó chịu. Chất liệu thoáng mát và không nhăn sau nhiều lần giặt. Một lựa chọn tuyệt vời!",
  },
  {
    id: 19,
    name: "Ella Taylor",
    role: "Nurse",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
    rating: 5,
    review:
      "Mặc dù tôi rất kén chọn sản phẩm thời trang, nhưng khi thử sản phẩm này tôi rất hài lòng. Chất liệu vải rất mềm mại, không gây kích ứng da, và vẫn giữ form sau khi giặt nhiều lần.",
  },
  {
    id: 20,
    name: "Benjamin Moore",
    role: "Photographer",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 5,
    review:
      "Tôi đã mua sản phẩm này để mặc khi chụp ảnh ngoài trời. Nó rất thoải mái và dễ dàng di chuyển, chất liệu cũng rất bền. Màu sắc vẫn giữ nguyên sau nhiều lần giặt, sản phẩm này thực sự xứng đáng với giá trị bỏ ra.",
  },
  {
    id: 21,
    name: "Charlotte Anderson",
    role: "Marketing Executive",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    rating: 5,
    review:
      "Sản phẩm này thật sự rất tuyệt vời. Chất liệu mềm mại, vải rất bền và dễ bảo quản. Mặc dù giá có thể hơi cao, nhưng chất lượng hoàn toàn xứng đáng. Tôi sẽ tiếp tục ủng hộ thương hiệu này.",
  },
  {
    id: 22,
    name: "Oliver King",
    role: "Artist",
    image: "https://randomuser.me/api/portraits/men/16.jpg",
    rating: 5,
    review:
      "Đây là một trong những sản phẩm tốt nhất mà tôi từng mua. Thiết kế đẹp mắt, rất hợp với phong cách của tôi. Chất liệu vải rất nhẹ và thoải mái, tôi có thể mặc cả ngày mà không cảm thấy bí bách.",
  },
  {
    id: 23,
    name: "Amelia Adams",
    role: "Scientist",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
    rating: 5,
    review:
      "Chất lượng sản phẩm rất tuyệt vời. Tôi đã thử nhiều sản phẩm khác nhưng không có sản phẩm nào vừa vặn và thoải mái như sản phẩm này. Nó không bị xù lông hay phai màu, và tôi rất hài lòng với sự chọn lựa này.",
  },
  {
    id: 24,
    name: "Evan Clark",
    role: "Driver",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 5,
    review:
      "Sản phẩm này rất tuyệt vời! Chất liệu mềm mại, thoáng mát, dễ chịu khi mặc. Tôi đã mặc nó suốt cả ngày mà không thấy khó chịu. Đặc biệt, màu sắc không bị phai sau nhiều lần giặt.",
  },
  {
    id: 25,
    name: "Sophie Young",
    role: "Financial Analyst",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    rating: 5,
    review:
      "Tôi đã mua sản phẩm này vì nó phù hợp với sở thích cá nhân của tôi. Chất liệu vải rất mềm, thoải mái và bền. Màu sắc tươi sáng, dễ dàng kết hợp với nhiều kiểu trang phục khác nhau.",
  },
  {
    id: 26,
    name: "Liam Harris",
    role: "Musician",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    rating: 5,
    review:
      "Sản phẩm này không chỉ đẹp mà còn rất bền. Chất liệu vải mềm mại, dễ chịu khi mặc lâu. Nó giữ form rất tốt sau nhiều lần giặt, và tôi rất hài lòng với sự lựa chọn của mình.",
  },
  {
    id: 27,
    name: "Mia Nelson",
    role: "Lawyer",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
    rating: 5,
    review:
      "Tôi đã rất hài lòng với sản phẩm này. Chất liệu vải mềm mại và thoáng khí, rất thoải mái khi mặc suốt cả ngày. Thiết kế tinh tế, dễ phối đồ và không bị nhăn khi giặt.",
  },
  {
    id: 28,
    name: "Logan Martinez",
    role: "Scientist",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    rating: 5,
    review:
      "Sản phẩm này rất đẹp và chất lượng tuyệt vời. Vải mềm mịn, thoải mái và dễ bảo quản. Sau nhiều lần giặt, sản phẩm vẫn giữ nguyên chất lượng, rất đáng đồng tiền bát gạo.",
  },
  {
    id: 29,
    name: "Isabella Evans",
    role: "Graphic Designer",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    rating: 5,
    review:
      "Chất lượng sản phẩm này thật sự vượt qua mong đợi của tôi. Vải mềm, dễ chịu và thiết kế rất đẹp mắt. Tôi thường xuyên mặc nó khi làm việc và cảm thấy rất thoải mái. Sản phẩm rất đáng để đầu tư.",
  },

  {
    id: 30,
    name: "Leslie Alexander",
    role: "Model",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    review:
      "Tôi rất ấn tượng với chất lượng sản phẩm. Chất liệu vải mềm mại, Đường may chắc chắn, không có lỗi. Giao hàng rất nhanh, đóng gói cẩn thận. Tôi đã thử giặt vài lần và màu sắc vẫn giữ nguyên, không bị phai hay nhăn nhúm.",
  },
];
