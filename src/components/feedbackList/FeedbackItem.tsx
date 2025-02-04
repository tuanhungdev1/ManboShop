import { Rate } from "@components/rate";
import { Avatar } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectAccessToken } from "@redux/slices/authSlice";
import {
  useLikeFeedbackMutation,
  useUnlikeFeedbackMutation,
} from "@services/feedbackApi";
import { FeedbackDto } from "@types-d/feedback";
import { formatDateTime } from "@utils/format";
import { AiFillLike } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface FeedbackItemProps {
  feedback: FeedbackDto;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const navigate = useNavigate();

  const accessToken = useAppSelector(selectAccessToken);

  const [likeFeedback] = useLikeFeedbackMutation();

  const [unlikeFeedback] = useUnlikeFeedbackMutation();

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
          <div className="text-lg mt-1">
            <HiOutlineDotsVertical />
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
    </div>
  );
};

export default FeedbackItem;
