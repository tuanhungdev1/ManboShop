import { dividerClasses, Pagination } from "@mui/material";
import { FeedbackDto } from "@types-d/feedback";
import { MetaData } from "@types-d/type";
import FeedbackItem from "./FeedbackItem";

interface FeedbackListProps {
  feedbackList: FeedbackDto[];
  pagination: MetaData;
  onPageChange: (page: number) => void; // Callback để cập nhật dữ liệu
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbackList,
  pagination,
  onPageChange,
}) => {
  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page); // Gọi callback để load dữ liệu mới
  };

  if (feedbackList.length === 0) {
    return (
      <div className="py-10 opacity-50 font-medium text-sm">
        Sản phẩm chưa có đánh giá
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="flex flex-col">
        {feedbackList.map((feedback) => (
          <FeedbackItem key={feedback.id} feedback={feedback} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPage > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={pagination.totalPage}
            page={pagination.currentPage}
            onChange={handlePageChange}
            color="primary"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                borderRadius: "0.375rem", // rounded-md
                border: "1px solid #000", // Thêm border nếu cần
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
