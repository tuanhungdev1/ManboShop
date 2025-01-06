import { Typography, Box } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import { PrimaryButton } from "@components/buttons";
import { InputType } from "@types-d/enums";
import { CustomCheckbox } from "@components/checkbox";

export interface LoginFormData {
  username: string;
  password: string;
  isRememberMe: boolean;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Tên đăng nhập là bắt buộc")
    .max(100, "Tên đăng nhập không được vượt quá 100 ký tự"),
  password: yup
    .string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  isRememberMe: yup.boolean().default(false),
});

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ mt: 5, width: 500, mx: "auto" }}>
      <Typography variant="h1" sx={{ fontSize: 45, fontWeight: "bold" }}>
        Chào mừng bạn 👋
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, mb: 5, fontSize: "1.25rem", opacity: 0.4 }}
      >
        Vui lòng đăng nhập vào tài khoản của bạn.
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
          Component={TextInput}
          type={InputType.Text}
          error={errors.username?.message}
          {...register("username")}
        />
        <FormField
          control={control}
          label="Mật khẩu"
          Component={TextInput}
          type={InputType.Password}
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="flex items-center justify-between">
          <Controller
            name="isRememberMe"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                label="Ghi nhớ đăng nhập"
                checked={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Box>
            <Link to={"/forgot-password"}>
              <Typography className="text-primary-500">
                Quên mật khẩu
              </Typography>
            </Link>
          </Box>
        </div>
        <PrimaryButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          className="mt-2 bg-blue-primary"
        >
          Đăng Nhập
        </PrimaryButton>
        <Typography
          variant="body1"
          sx={{ mt: 4, textAlign: "center", opacity: 0.8 }}
        >
          Chưa có tài khoản?{" "}
          <Link to={"/register"} className="text-primary-500">
            Đăng ký ngay
          </Link>
        </Typography>
      </form>
    </Box>
  );
};

export default LoginPage;
