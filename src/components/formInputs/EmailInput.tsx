import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GoArrowUpRight } from "react-icons/go";

interface IFormInput {
  email: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Email phải có định dạng @gmail.com"
    )
    .required("Email là bắt buộc"),
});

const EmailInput: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex text-[14px] bg-primary-800 py-[4px] px-[4px]"
      >
        <input
          type="email"
          placeholder="Địa chỉ Email"
          className="flex-1 bg-transparent py-[14px] px-[12px] border-none outline-none placeholder:font-medium"
          {...register("email")}
        />
        <button
          type="submit"
          className="uppercase flex items-center px-[12px] font-bold bg-second-500 gap-6"
        >
          gửi
          <div className="flex text-[20px] w-[25px] h-[25px] items-center justify-center text-black bg-white">
            <GoArrowUpRight />
          </div>
        </button>
      </form>
      {errors.email && (
        <p className="text-red-500 text-[14px] mt-2">{errors.email.message}</p>
      )}
    </div>
  );
};

export default EmailInput;
