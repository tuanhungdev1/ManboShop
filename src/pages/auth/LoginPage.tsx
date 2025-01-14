import { SubmitHandler, useForm } from "react-hook-form";
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
import { useLoginMutation } from "@services/rootApi";
import { useAppDispatch } from "@redux/hooks";
import { useEffect } from "react";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { ApiErrorResponse } from "@types-d/type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

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
  const [login, { data, isError, isSuccess, error }] = useLoginMutation();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

    login(data);
  };

  useEffect(() => {
    if (isError) {
      const fetchError = error as FetchBaseQueryError;
      if ("data" in fetchError) {
        const errorData = fetchError.data as ApiErrorResponse;
        console.log(errorData);
        dispatch(openSnackbar({ type: "error", message: errorData.Message }));
      } else {
        const serializedError = error as SerializedError;
        dispatch(
          openSnackbar({
            type: "error",
            message: serializedError.message || "An error occurred",
          })
        );
      }
    }

    if (isSuccess) {
      dispatch(openSnackbar({ type: "success", message: data.message }));
      navigate("/");
    }
  }, [isError, dispatch, data, isSuccess, navigate, error]);

  console.log(data, error);
  return (
    <div className="mx-auto text-[14px] sm:w-[450px] w-full mt-5">
      <div className="flex items-center w-full text-[14px] text-center">
        <Link
          to={"/account/login"}
          className="flex-1 py-4 font-semibold border-b border-black"
        >
          <span>Đăng Nhập</span>
        </Link>
        <Link
          to={"/account/register"}
          className="flex-1 py-4 border-b border-primary-300 opacity-60"
        >
          <span>Đăng Ký</span>
        </Link>
      </div>

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

        <div className="text-[14px] underline text-center mt-2 font-semibold">
          <Link to={"/forgot-password"}>
            <span className="text-primary-500">Quên mật khẩu</span>
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
      </form>
    </div>
  );
};

export default LoginPage;
