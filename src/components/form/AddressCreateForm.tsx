import { PrimaryButton } from "@components/buttons";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import { useCreateAddressMutation } from "@services/addressApi";
import { AddressForCreateDto } from "@types-d/address";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { Checkbox } from "@components/checkbox";

export const addressForCreateValidationSchema = yup.object({
  name: yup
    .string()
    .required("Họ và tên không được để trống.")
    .max(100, "Họ và tên không được vượt quá 100 ký tự."),
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được để trống.")
    .max(20, "Số điện thoại không được vượt quá 20 ký tự.")
    .matches(/^[0-9]+$/, "Số điện thoại không hợp lệ."),
  addressLine: yup
    .string()
    .required("Địa chỉ chi tiết không được để trống.")
    .max(1000, "Địa chỉ chi tiết không được vượt quá 1000 ký tự."),
  city: yup
    .string()
    .required("Thành phố không được để trống.")
    .max(200, "Thành phố không được vượt quá 200 ký tự."),
  state: yup
    .string()
    .required("Tỉnh/Bang không được để trống.")
    .max(200, "Tỉnh/Bang không được vượt quá 200 ký tự."),
  country: yup
    .string()
    .required("Quốc gia không được để trống.")
    .max(200, "Quốc gia không được vượt quá 200 ký tự."),
  postalCode: yup
    .string()
    .required("Mã bưu điện không được để trống.")
    .max(100, "Mã bưu điện không được vượt quá 100 ký tự."),
  isDefault: yup.boolean().optional().default(false),
});

const AddressCreateForm = ({ refetch }: { refetch: () => void }) => {
  const [createAddress] = useCreateAddressMutation();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddressForCreateDto>({
    resolver: yupResolver(addressForCreateValidationSchema),
  });

  const isDefault = watch("isDefault");

  const handleSetIsDefault = () => {
    setValue("isDefault", !isDefault);
  };

  const onSubmit: SubmitHandler<AddressForCreateDto> = async (data) => {
    try {
      await createAddress(data).unwrap();

      await dispatch(
        openSnackbar({
          type: "success",
          message: "Địa chỉ đã được tạo thành công!",
        })
      );
      refetch();
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            Object.values(error?.data?.errors || {})
              .flat()
              .join("\n") || "Không thể tạo địa chỉ",
        })
      );
    }
  };

  return (
    <Box sx={{ bgcolor: "background.paper", borderRadius: 2, marginTop: 4 }}>
      <Typography variant="h6" mb={3} fontWeight={700}>
        Thêm Địa Chỉ Mới
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Họ và Tên"
              name="name"
              Component={TextInput}
              error={errors.name?.message}
              placeholder="Nhập họ và tên"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Số điện thoại"
              name="phoneNumber"
              Component={TextInput}
              error={errors.phoneNumber?.message}
              placeholder="Nhập số điện thoại"
            />
          </Grid>
          <Grid item xs={12}>
            <FormField
              control={control}
              label="Địa chỉ"
              name="addressLine"
              Component={TextInput}
              error={errors.addressLine?.message}
              placeholder="Nhập địa chỉ chi tiết"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Thành phố"
              name="city"
              Component={TextInput}
              error={errors.city?.message}
              placeholder="Nhập thành phố"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Tỉnh/Bang"
              name="state"
              Component={TextInput}
              error={errors.state?.message}
              placeholder="Nhập tỉnh/bang"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Quốc gia"
              name="country"
              Component={TextInput}
              error={errors.country?.message}
              placeholder="Nhập quốc gia"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormField
              control={control}
              label="Mã bưu điện"
              name="postalCode"
              Component={TextInput}
              error={errors.postalCode?.message}
              placeholder="Nhập mã bưu điện"
            />
          </Grid>
          <Grid item xs={12}>
            <Checkbox
              label="Đặt làm địa chỉ mặc định"
              isChecked={isDefault ?? false}
              onClick={handleSetIsDefault}
              classname="mt-2"
            />
          </Grid>
          <Grid item xs={12}>
            <PrimaryButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Thêm Địa Chỉ
            </PrimaryButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressCreateForm;
