import { PrimaryButton } from "@components/buttons";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import UpdateProfileModal from "@components/modals/UpdateProfileModal";
import { Avatar, Grid, Skeleton } from "@mui/material";

import { useGetUserQuery } from "@services/userApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";

const PersonalInformationPage = () => {
  const { data: userData, isLoading, isFetching, refetch } = useGetUserQuery();
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const { control } = useForm();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || isFetching) {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton variant="circular" width={100} height={100} />
              <div>
                <Skeleton width={200} height={40} />
                <Skeleton width={150} height={20} />
              </div>
            </div>
            <Skeleton
              variant="rectangular"
              width={120}
              height={50}
              sx={{ borderRadius: "8px" }}
            />
          </div>
        </Grid>
        {[...Array(5)].map((_, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Skeleton
              variant="rectangular"
              height={70}
              sx={{ borderRadius: "8px" }}
            />
          </Grid>
        ))}
      </Grid>
    );
  }
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <div className="flex items-center justify-between">
          <div className="relative">
            <Avatar
              alt={userData?.data!.firstName}
              src={userData?.data!.profilePictureUrl}
              sx={{ width: 100, height: 100 }}
            />
          </div>

          <div>
            <PrimaryButton
              className="flex gap-2"
              onClick={() => setOpenUpdateModal(true)}
              sx={{
                paddingX: "24px",
                paddingY: "16px",
              }}
            >
              <div className="text-[20px]">
                <FiEdit />
              </div>
              <span className="text-sm font-normal">Chỉnh sửa thông tin</span>
            </PrimaryButton>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormField
          control={control}
          label="First Name"
          Component={(props) => (
            <TextInput
              {...props}
              value={userData?.data!.firstName || ""}
              className="select-none pointer-events-none"
              inputStyle={{
                "& .MuiOutlinedInput-input": {
                  fontWeight: 500,
                },
              }}
            />
          )}
          name=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormField
          control={control}
          label="Last Name"
          Component={(props) => (
            <TextInput
              {...props}
              value={userData?.data!.lastName || ""}
              className="select-none pointer-events-none"
              inputStyle={{
                "& .MuiOutlinedInput-input": {
                  fontWeight: 500,
                },
              }}
            />
          )}
          name=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormField
          control={control}
          label="Email"
          Component={(props) => (
            <TextInput
              {...props}
              value={userData?.data!.email || ""}
              className="select-none pointer-events-none"
              inputStyle={{
                "& .MuiOutlinedInput-input": {
                  fontWeight: 500,
                },
              }}
            />
          )}
          name=""
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormField
          control={control}
          label="Phone Number"
          Component={(props) => (
            <TextInput
              {...props}
              value={userData?.data!.phoneNumber || ""}
              className="select-none pointer-events-none"
              inputStyle={{
                "& .MuiOutlinedInput-input": {
                  fontWeight: 500,
                },
              }}
            />
          )}
          name=""
        />
      </Grid>
      <Grid item xs={12} md={12}>
        <FormField
          control={control}
          label="Address"
          Component={(props) => (
            <TextInput
              {...props}
              value={userData?.data!.address || ""}
              className="select-none pointer-events-none"
              inputStyle={{
                "& .MuiOutlinedInput-input": {
                  fontWeight: 500,
                },
              }}
            />
          )}
          name=""
        />
      </Grid>
      <UpdateProfileModal
        refetch={() => refetch()}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      />
    </Grid>
  );
};

export default PersonalInformationPage;
