import { Checkbox } from "@components/checkbox";
import { AddressUpdateModel, ConfirmModal } from "@components/modals";
import { useModal } from "@hooks/useModal";
import { useAppDispatch } from "@redux/hooks";
import { setSelectedAddress } from "@redux/slices/checkoutSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "@services/addressApi";
import { AddressDto } from "@types-d/address";
import { cn } from "@utils/cn";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

interface AddressItemProps {
  address: AddressDto;
}

const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
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

  const [deleteAddress] = useDeleteAddressMutation();

  const [updateAddress] = useUpdateAddressMutation();

  const handleSelectedAddressForCheckout = async () => {
    try {
      await updateAddress({
        id: address.id,
        addressDto: {
          name: address.name,
          addressLine: address.addressLine,
          city: address.city,
          country: address.country,
          phoneNumber: address.phoneNumber,
          postalCode: address.postalCode,
          isDefault: true,
          state: address.state,
        },
      }).unwrap();
      dispatch(setSelectedAddress(address.id));
      dispatch(
        openSnackbar({
          type: "success",
          message: "Chọn địa chỉ nhận hàng cho đơn hàng thành công!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Không chọn địa chỉ này!",
        })
      );
    }
  };

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
    <div
      className={cn(
        "px-5 border-gray-50 border-[1px] select-none hover:border-black transition-all duration-200 py-4 text-sm font-medium bg-gray-50 rounded-lg cursor-pointer",
        address.isDefault && "border-black shadow-md"
      )}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">{address.name}</h1>
        <div className="ml-4">
          <Checkbox
            label=""
            onClick={() => handleSelectedAddressForCheckout()}
            isChecked={address.isDefault}
          />
        </div>
      </div>
      <span className="block mt-4">{address.addressLine}</span>
      <div className="flex text-[12px] gap-4 mt-6">
        <div
          onClick={() => handleEditAddress(address)}
          className="bg-gray-200 flex-1 text-black justify-center flex items-center gap-2 rounded-md py-2 px-3 xl:py-3 xl:px-4 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <div className="text-[22px]">
            <BiEdit />
          </div>
          <span className="">Edit</span>
        </div>
        <div
          onClick={() => handleDeleteAddress(address)}
          className="bg-red-100 flex-1 justify-center text-red-500 flex items-center gap-2 rounded-md py-2 px-3 xl:py-3 xl:px-4 opacity-60 hover:opacity-100 transition-all duration-200 cursor-pointer"
        >
          <div className="text-[22px]">
            <MdDeleteOutline />
          </div>
          <span className="">Delete</span>
        </div>
      </div>

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
    </div>
  );
};

export default AddressItem;
