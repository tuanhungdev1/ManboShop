import { PrimaryButton } from "@components/buttons";
import AddressCreateModel from "@components/modals/AddressCreateModel";
import AddressUpdateModel from "@components/modals/AddressUpdateModel";
import ConfirmModal from "@components/modals/ConfirmModal";
import { useModal } from "@hooks/useModal";
import { Grid } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import {
  useDeleteAddressMutation,
  useGetUserAddressesQuery,
} from "@services/addressApi";
import { AddressDto } from "@types-d/address";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdOutlinePhoneInTalk } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";

const AddressPage = () => {
  const {
    isOpen: isOpenCreate,
    openModal: openCreateModel,
    closeModal: closeCreateModal,
  } = useModal();
  const {
    isOpen: isOpenUpdate,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const {
    isOpen: isOpenDelete,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const dispatch = useAppDispatch();
  const [selectedAddressDto, setSelectedAddressDto] =
    useState<AddressDto | null>(null);

  const { data: address } = useGetUserAddressesQuery();

  const [deleteAddress] = useDeleteAddressMutation();

  const handleEditAddress = (address: AddressDto) => {
    setSelectedAddressDto(address);
    openUpdateModal();
  };

  const handleDeleteAddress = (addres: AddressDto) => {
    setSelectedAddressDto(addres);
    openDeleteModal();
  };

  const handleConfirmDeleteAddress = async () => {
    try {
      if (!selectedAddressDto) return;
      await deleteAddress(selectedAddressDto?.id).unwrap();

      dispatch(
        openSnackbar({
          type: "success",
          message: "Xóa thành công 1 địa chỉ của bạn!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Không thể xóa địa chỉ này!",
        })
      );
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <div className="flex items-center justify-end">
          <div>
            <PrimaryButton
              className="flex gap-2"
              onClick={openCreateModel}
              sx={{
                paddingX: "24px",
                paddingY: "16px",
              }}
            >
              <div className="text-[20px]">
                <FiEdit />
              </div>
              <span className="text-sm font-normal">Thêm địa chỉ mới</span>
            </PrimaryButton>
          </div>
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="first:border-t">
          {address?.data &&
            address &&
            address.data.length > 0 &&
            address?.data?.map((item) => (
              <div
                key={item.id}
                className="py-8 border-b flex items-center font-medium select-none justify-between"
              >
                <div className="flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">{item.name}</span>
                    {item.isDefault && (
                      <div className="py-2 text-gray-600 px-2 text-[12px] rounded-md bg-gray-100">
                        Mặc định
                      </div>
                    )}
                  </div>
                  <span>{item.addressLine}</span>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">
                      <MdOutlinePhoneInTalk />
                    </div>
                    <span>{item.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <div
                    onClick={() => handleEditAddress(item)}
                    className="bg-green-100 text-green-600 flex items-center gap-2 rounded-md py-2 px-3 xl:py-3 xl:px-4 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer"
                  >
                    <div className="text-[22px]">
                      <BiEdit />
                    </div>
                    <span className="text-sm">Edit</span>
                  </div>
                  <div
                    onClick={() => handleDeleteAddress(item)}
                    className="bg-red-100 text-red-500 flex items-center gap-2 rounded-md py-2 px-3 xl:py-3 xl:px-4 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer"
                  >
                    <div className="text-[22px]">
                      <MdDeleteOutline />
                    </div>
                    <span className="text-sm">Delete</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Grid>
      {address?.data?.length === 0 && (
        <div className="w-full pt-28 pb-28 h-full flex flex-col items-center justify-center">
          <div className="text-[60px] mb-6 opacity-50">
            <TfiFaceSad />
          </div>

          <p className="text-base font-medium text-gray-600">
            Bạn chưa tạo địa chỉ!
          </p>
        </div>
      )}
      {selectedAddressDto && isOpenUpdate && (
        <AddressUpdateModel
          initialData={selectedAddressDto}
          refetch={() => {}}
          open={isOpenUpdate}
          onClose={closeUpdateModal}
        />
      )}

      {selectedAddressDto && isOpenDelete && (
        <ConfirmModal
          isOpen={isOpenDelete}
          message="Bạn chắc chắn muốn xóa địa chỉ này!"
          onClose={closeDeleteModal}
          onConfirm={handleConfirmDeleteAddress}
        />
      )}

      <AddressCreateModel
        open={isOpenCreate}
        onClose={closeCreateModal}
        refetch={() => {}}
      />
    </Grid>
  );
};

export default AddressPage;
