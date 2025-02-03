import { PrimaryButton } from "@components/buttons";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectAccessToken } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useCreateFeedbackMutation } from "@services/feedbackApi";
import { FeedbackForCreateDto } from "@types-d/feedback";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface CreateFeedbackFormProps {
  productId: number;
}

const feedbackForCreateSchema = yup.object({
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
    .optional()
    .min(0, "Star rating must be at least 0.")
    .max(5, "Star rating cannot be more than 5."),
});

const CreateFeedbackForm: React.FC<CreateFeedbackFormProps> = ({
  productId,
}) => {
  const navigate = useNavigate();
  const [numberStar, setNumberStar] = useState(0);
  const accessToken = useAppSelector(selectAccessToken);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FeedbackForCreateDto>({
    resolver: yupResolver(feedbackForCreateSchema),
    defaultValues: {
      star: 0,
      productId: productId,
    },
  });
  const dispatch = useAppDispatch();

  const handleSelectedNumberStar = (num: number) => {
    if (num < 0 || num > 5) return;

    setNumberStar(num);
    setValue("star", num);
  };

  const [createFeedback] = useCreateFeedbackMutation();

  const onSubmit: SubmitHandler<FeedbackForCreateDto> = async (data) => {
    if (!accessToken) {
      localStorage.setItem(
        "redirectAfterLogin",
        window.location.pathname + window.location.search
      );
      navigate("/account/login");
      return;
    }

    try {
      await createFeedback(data).unwrap();
      dispatch(
        openSnackbar({
          type: "success",
          message: "Đánh giá sản phẩm thành công!",
        })
      );
      setNumberStar(0);
      reset({
        star: 0,
        title: "",
        content: "",
        productId: productId,
      });
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Không thể đánh giá sản phẩm!",
        })
      );
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Add your Review</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
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
    </div>
  );
};

export default CreateFeedbackForm;
