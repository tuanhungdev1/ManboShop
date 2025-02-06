import { ConfirmModal, UpdateFeedbackModal } from "@components/modals";
import { Rate } from "@components/rate";
import { useModal } from "@hooks/useModal";
import { Avatar, Menu } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAccessToken, selectUser } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import {
  useDeleteFeedbackMutation,
  useLikeFeedbackMutation,
  useUnlikeFeedbackMutation,
} from "@services/feedbackApi";
import { FeedbackDto } from "@types-d/feedback";
import { authStorage } from "@utils/authStorage";
import { formatDateTime } from "@utils/format";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface FeedbackItemProps {
  feedback: FeedbackDto;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const {
    isOpen: showUpdateFeedbackModel,
    closeModal: closeUpdateFeedbackModel,
    openModal: openUpdateFeedbackModel,
  } = useModal();
  const {
    isOpen: showDeleteFeedbackModel,
    closeModal: closeDeleteFeedbackModel,
    openModal: openDeleteFeedbackModel,
  } = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const accessToken =
    useAppSelector(selectAccessToken) ?? authStorage.getAuthData()?.accessToken;
  const dispatch = useAppDispatch();
  const [likeFeedback] = useLikeFeedbackMutation();
  const [unlikeFeedback] = useUnlikeFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const toggleShowFeedbackOptions = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorEl) {
      setAnchorEl(null); // Đóng menu nếu đang mở
    } else {
      setAnchorEl(event.currentTarget); // Mở menu theo phần tử cha
    }
  };

  const handleLikeAction = async () => {
    if (!accessToken) {
      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname + window.location.search
      );
      navigate("/account/login");
      return;
    }

    try {
      if (feedback.isLiked) {
        await unlikeFeedback(feedback.id).unwrap();
      } else {
        await likeFeedback(feedback.id).unwrap();
      }
    } catch (error) {
      console.error("Error handling like action:", error);
    }
  };

  const handleDeleteFeedback = async () => {
    try {
      await deleteFeedback(feedback.id).unwrap();

      dispatch(
        openSnackbar({
          type: "success",
          message: "Xóa đánh giá thành công!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Không thể xóa đánh giá!",
        })
      );
    }
  };

  const renderLikeButton = () => {
    const likeButtonClass = feedback.isLiked
      ? "cursor-pointer text-blue-500"
      : "cursor-pointer opacity-30";

    return (
      <div className="flex items-center gap-2" onClick={handleLikeAction}>
        <div className={likeButtonClass}>
          <AiFillLike />
        </div>
        {feedback.totalLikes > 0 && (
          <span className="text-sm mt-1">{feedback.totalLikes}</span>
        )}
      </div>
    );
  };

  return (
    <div key={feedback.id} className="py-6  border-b">
      <div className="flex items-center gap-3">
        <div>
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={feedback.user.profilePictureUrl}
            alt={feedback.user.firstName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">
            {feedback.user.firstName} {feedback.user.lastName}
          </span>

          <div>
            <Rate numberRate={feedback.star} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="font-bold">{feedback.title}</h1>
        <p className="text-sm font-medium mt-2">{feedback.content}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center text-2xl gap-3">
          {renderLikeButton()}
          <div
            className="text-lg mt-1 cursor-pointer relative"
            onClick={toggleShowFeedbackOptions}
          >
            <HiOutlineDotsVertical />
            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={toggleShowFeedbackOptions}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  minWidth: "200px",
                  position: "absolute",
                  mt: 1,
                  "& .MuiMenuItem-root": { typography: "body2" },
                },
              }}
            >
              {user && feedback.userId === user?.id && (
                <>
                  <div
                    onClick={openUpdateFeedbackModel}
                    className={`
                  px-4 py-2 
                  cursor-pointer 
                  text-[14px] 
                  font-medium
                  hover:bg-gray-100 
                  transition-colors 
                `}
                  >
                    Chỉnh sửa
                  </div>
                  <div
                    onClick={openDeleteFeedbackModel}
                    className={`
                  px-4 py-2 
                  cursor-pointer 
                  text-[14px] 
                  font-medium
                  hover:bg-gray-100 
                  transition-colors 
                `}
                  >
                    Xóa
                  </div>
                </>
              )}
              <div
                onClick={() => {}}
                className={`
                  px-4 py-2 
                  cursor-pointer 
                  text-[14px] 
                  font-medium
                  hover:bg-gray-100 
                  transition-colors 
                `}
              >
                Báo cáo
              </div>
            </Menu>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-400 font-medium">
            <span className="text-black opacity-50">
              {formatDateTime(feedback.createdAt.toString())}
            </span>
          </span>
        </div>
      </div>

      <UpdateFeedbackModal
        feedback={feedback}
        open={showUpdateFeedbackModel}
        onClose={closeUpdateFeedbackModel}
      />
      <ConfirmModal
        isOpen={showDeleteFeedbackModel}
        onClose={closeDeleteFeedbackModel}
        message="Bạn chắc chán muốn xóa đánh giá này?"
        onConfirm={() => handleDeleteFeedback()}
      />
    </div>
  );
};

export default FeedbackItem;
