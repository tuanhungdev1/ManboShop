import { PrimaryButton } from "@components/buttons";
import { FormField } from "@components/formFields";
import { TextInput } from "@components/formInputs";
import UpdateProfileModal from "@components/modals/UpdateProfileModal";
import { Avatar, Grid } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { selectUser } from "@redux/slices/authSlice";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit } from "react-icons/fi";

const PersonalInformationPage = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const user = useAppSelector(selectUser);
  const { control } = useForm();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <div className="flex items-center justify-between">
          <div className="relative">
            <Avatar
              alt={user?.firstName}
              src={user?.profilePictureUrl}
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
              <span className="text-sm font-normal">Edit Profile</span>
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
              value={user?.firstName || ""}
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
              value={user?.lastName || ""}
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
              value={user?.email || ""}
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
              value={user?.phoneNumber || ""}
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
              value={user?.address || ""}
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
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      />
    </Grid>
  );
};

export default PersonalInformationPage;
