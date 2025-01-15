import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  PrimaryButton,
} from "@components/buttons";
import { InputType } from "@types-d/enums";
import { cn } from "@utils/cn";
import { CustomCheckbox } from "@components/checkbox";
import { useAppDispatch } from "@redux/hooks";
import { useRegisterMutation } from "@services/authApi";
import { useEffect } from "react";
import { openSnackbar } from "@redux/slices/snackbarSlice";

export interface RegisterFormData {
  username: string;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  subscribes: boolean;
}

const schema = yup.object().shape({
  firstname: yup
    .string()
    .required("Tên là bắt buộc")
    .max(100, "Tên không được vượt quá 100 ký tự")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔơưăêô\s]+$/,
      "Tên không được chứa số hoặc ký tự đặc biệt"
    ),
  lastname: yup
    .string()
    .required("Họ là bắt buộc")
    .max(100, "Họ không được vượt quá 100 ký tự")
    .matches(
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÊÔơưăêô\s]+$/,
      "Họ không được chứa số hoặc ký tự đặc biệt"
    ),
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
  terms: yup
    .boolean()
    .oneOf([true], "Bạn phải đồng ý với điều khoản và điều kiện")
    .required(),
  subscribes: yup.boolean().default(false),
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [register, { data, isSuccess }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      terms: false,
      subscribes: false,
    },
  });

  const termsAccepted = watch("terms");

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    console.log(data);
    register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          type: "success",
          message: data.message,
        })
      );

      navigate("/account/login");
    }
  }, [isSuccess, data?.message, navigate, dispatch]);

  return (
    <div className="mx-auto text-[14px] sm:w-[450px] w-full mt-5">
      <div className="flex items-center w-full text-[14px] text-center">
        <Link
          to={"/account/login"}
          className="flex-1 py-4 border-b border-primary-300 opacity-60"
        >
          <span>Đăng Nhập</span>
        </Link>
        <Link
          to={"/account/register"}
          className="flex-1 py-4 font-semibold border-b border-black"
        >
          <span>Đăng Ký</span>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          marginTop: "40px",
        }}
        className="w-full select-none"
      >
        <FormField
          control={control}
          label="Email*"
          name="email"
          Component={TextInput}
          error={errors.email?.message}
          type={InputType.Email}
          placeholder="Nhập Email"
        />

        <FormField
          control={control}
          label="Tên đăng nhập*"
          error={errors.username?.message}
          Component={(props) => <TextInput {...props} />}
          name="username"
          placeholder="Tên đăng nhập"
        />

        <FormField
          control={control}
          label="Họ*"
          error={errors.lastname?.message}
          Component={(props) => <TextInput {...props} />}
          name="lastname"
          placeholder="Nhập họ của bạn"
        />

        <FormField
          control={control}
          label="Tên*"
          error={errors.firstname?.message}
          Component={(props) => <TextInput {...props} />}
          name="firstname"
          placeholder="Nhập tên của bạn"
        />

        <FormField
          control={control}
          label="Mật khẩu*"
          Component={TextInput}
          error={errors.password?.message}
          type={InputType.Password}
          name="password"
          placeholder="Nhập mật khẩu"
        />

        <FormField
          control={control}
          label="Xác nhận mật khẩu*"
          error={errors.confirmPassword?.message}
          Component={TextInput}
          type={InputType.Password}
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
        />

        <div>
          <Controller
            name="terms"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                {...field}
                checked={field.value}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                label="Tôi đồng ý với điều khoản và điều kiện"
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              />
            )}
          />

          <Controller
            name="subscribes"
            control={control}
            render={({ field }) => (
              <CustomCheckbox
                {...field}
                checked={field.value}
                sx={{}}
                onChange={(e) => {
                  field.onChange(e.target.checked);
                }}
                label="Đăng ký nhận thư mời ưu đãi từ KG Vietnam"
                labelStyle={{
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              />
            )}
          />
        </div>

        <PrimaryButton
          type="submit"
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          className={cn(
            "font-bold",
            termsAccepted
              ? "pointer-events-auto opacity-100 "
              : "pointer-events-none opacity-70 cursor-pointer"
          )}
        >
          REGISTER
        </PrimaryButton>
      </form>

      <div className="mt-5 font-medium text-center opacity-60">
        Bằng việc đăng kí, bạn đã đồng ý với KG về
      </div>
      <div className="flex items-center justify-center gap-1">
        <Link to={""} target="_blank" className="font-semibold underline">
          <span>Điều khoản dịch vụ </span>
        </Link>
        <span className="font-medium text-center opacity-60">&</span>
        <Link to={""} target="_blank" className="font-semibold underline">
          <span>Chính sách bảo mật</span>
        </Link>
      </div>

      <div className="flex text-[15px] mb-5 items-center justify-between gap-10 mt-5">
        <div className="h-[0.5px] flex-1 bg-primary-300"></div>
        <div className="font-bold">Hoặc</div>
        <div className="h-[0.5px] flex-1 bg-primary-300"></div>
      </div>

      <div className="flex flex-col gap-4">
        <GoogleLoginButton />
        <FacebookLoginButton />
      </div>
    </div>
  );
};

export default RegisterPage;
