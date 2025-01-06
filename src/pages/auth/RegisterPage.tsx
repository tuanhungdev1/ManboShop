import { Typography, Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { PrimaryButton } from "@components/buttons";
import { InputType } from "@types-d/enums";

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Tên đăng nhập là bắt buộc")
    .max(100, "Tên đăng nhập không được vượt quá 100 ký tự"),
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Địa chỉ email không hợp lệ"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ mt: 5, width: 500, mx: "auto" }}>
      <Typography variant="h1" sx={{ fontSize: 45, fontWeight: "bold" }}>
        Tạo Tài Khoản Mới 🫰
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, mb: 5, fontSize: "1.25rem", opacity: 0.4 }}
      >
        Vui lòng nhập thông tin chi tiết để tạo tài khoản mới.
      </Typography>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "40px",
        }}
      >
        <FormField
          control={control}
          label="Tên đăng nhập"
          error={errors.username?.message}
          Component={(props) => <TextInput {...props} />}
          {...register("username")}
        />

        <FormField
          control={control}
          label="Email"
          Component={TextInput}
          error={errors.email?.message}
          type={InputType.Email}
          {...register("email")}
        />

        <FormField
          control={control}
          label="Mật khẩu"
          Component={TextInput}
          error={errors.password?.message}
          type={InputType.Password}
          {...register("password")}
        />

        <FormField
          control={control}
          label="Xác nhận mật khẩu"
          error={errors.confirmPassword?.message}
          Component={TextInput}
          type={InputType.Password}
          {...register("confirmPassword")}
        />

        <PrimaryButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          className="mt-2 bg-blue-primary"
        >
          Đăng Ký
        </PrimaryButton>
        <Typography
          variant="body1"
          sx={{ mt: 4, textAlign: "center", opacity: 0.8 }}
        >
          Đã có tài khoản?{" "}
          <Link to={"/login"} className="text-primary-500">
            Đăng nhập
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default RegisterPage;
