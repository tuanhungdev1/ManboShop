import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import { FiX } from "react-icons/fi";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { PrimaryButton } from "@components/buttons";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useEffect, useState } from "react";
import { FeedbackDto, FeedbackForUpdateDto } from "@types-d/feedback";
import { useUpdateFeedbackMutation } from "@services/feedbackApi";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";

const feedbackForUpdateSchema = yup.object({
  title: yup
    .string()
    .required("Title is required.")
    .max(1000, "Title cannot exceed 1000 characters."),

  content: yup
    .string()
    .required("Content is required.")
    .max(1000, "Content cannot exceed 1000 characters."),

  star: yup
    .number()
    .required("Star is required.")
    .min(0, "Star rating must be at least 0.")
    .max(5, "Star rating cannot be more than 5."),
});

const UpdateFeedbackModal = ({
  open,
  feedback,
  onClose,
}: {
  feedback: FeedbackDto;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const [updateFeedback, { isSuccess, data }] = useUpdateFeedbackMutation();
  const [numberStar, setNumberStar] = useState(feedback.star);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FeedbackForUpdateDto>({
    resolver: yupResolver(feedbackForUpdateSchema),
    defaultValues: {
      star: feedback.star ?? 0,
      content: feedback.content,
      title: feedback.title,
    },
  });

  const handleSelectedNumberStar = (num: number) => {
    if (num < 0 || num > 5) return;

    setNumberStar(num);
    setValue("star", num);
  };

  const onSubmit: SubmitHandler<FeedbackForUpdateDto> = async (data) => {
    try {
      await updateFeedback({
        id: feedback.id,
        feedbackDto: data,
      }).unwrap();
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            Object.values(error?.data?.errors).flat().join("\n") ||
            "Cập nhật đánh giá thất bại!",
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          type: "success",
          message: "Cập nhật đánh giá thành công!",
        })
      );
      onClose();
    }
  }, [isSuccess, data?.message, dispatch]);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="update-profile-modal">
      <Box
        sx={modalStyle}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90%]"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6">Cập Nhật Đánh Giá</Typography>
          <IconButton onClick={onClose}>
            <FiX />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="flex flex-col gap-2">
                <span className="font-medium text-sm mb-2">Your Rating</span>
                <div className="text-4xl text-primary-500 justify-start gap-y-4 flex items-center flex-wrap">
                  {[...Array(6)].map((_, index) => {
                    if (index === 0) return null;
                    return (
                      <div
                        key={index}
                        className="flex items-center border-r mr-4 pr-4 cursor-pointer"
                        onClick={() => handleSelectedNumberStar(index)}
                      >
                        {[...Array(index)].map((_, starIndex) => (
                          <div key={starIndex}>
                            {index !== numberStar ? (
                              <CiStar />
                            ) : (
                              <TiStarFullOutline />
                            )}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={control}
                label="Title"
                name="title"
                Component={TextInput}
                error={errors.title?.message}
                placeholder="Enter Your Title"
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={control}
                label="Content"
                name="content"
                Component={(props) => <TextInput {...props} />}
                error={errors.content?.message}
                placeholder="Enter Your Content"
              />
            </Grid>

            <Grid item xs={12}>
              <PrimaryButton type="submit" variant="contained" color="primary">
                Submit
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateFeedbackModal;
