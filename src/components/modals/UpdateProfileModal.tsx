import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Modal, Box, Typography, IconButton, Grid } from "@mui/material";
import { FiX } from "react-icons/fi";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { PrimaryButton } from "@components/buttons";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { saveUser, selectUser } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useUpdateUserMutation } from "@services/userApi";
import { useEffect } from "react";

export interface UpdateProfileFormData {
  firstname?: string;
  lastname?: string;
  phoneNumber?: string;
  address?: string;
}

const updateProfileSchema = yup.object().shape({
  firstname: yup
    .string()
    .max(100, "Tên không được vượt quá 100 ký tự")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔơưăêô\s]+$/,
      "Tên không được chứa số hoặc ký tự đặc biệt"
    ),
  lastname: yup
    .string()
    .max(100, "Họ không được vượt quá 100 ký tự")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔơưăêô\s]+$/,
      "Họ không được chứa số hoặc ký tự đặc biệt"
    ),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
    .min(10, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ"),
  address: yup.string().max(255, "Địa chỉ không được vượt quá 255 ký tự"),
});

const UpdateProfileModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [updateProfile, { isSuccess, data }] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormData>({
    resolver: yupResolver(updateProfileSchema),
    defaultValues: {
      firstname: user?.firstName || "",
      lastname: user?.lastName || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    try {
      await updateProfile(data).unwrap();
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            Object.values(error?.data?.errors).flat().join("\n") ||
            "Cập nhật thông tin thất bại",
        })
      );
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          type: "success",
          message: data.message,
        })
      );

      dispatch(saveUser(data));
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
          <Typography variant="h6">Cập Nhật Thông Tin</Typography>
          <IconButton onClick={onClose}>
            <FiX />
          </IconButton>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormField
                control={control}
                label="Họ*"
                name="lastname"
                Component={TextInput}
                error={errors.lastname?.message}
                placeholder="Nhập họ của bạn"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormField
                control={control}
                label="Tên*"
                name="firstname"
                Component={TextInput}
                error={errors.firstname?.message}
                placeholder="Nhập tên của bạn"
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={control}
                label="Số Điện Thoại"
                name="phoneNumber"
                Component={TextInput}
                error={errors.phoneNumber?.message}
                placeholder="Nhập số điện thoại"
              />
            </Grid>
            <Grid item xs={12}>
              <FormField
                control={control}
                label="Địa Chỉ"
                name="address"
                Component={TextInput}
                error={errors.address?.message}
                placeholder="Nhập địa chỉ"
              />
            </Grid>
            <Grid item xs={12}>
              <PrimaryButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Cập Nhật
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProfileModal;
