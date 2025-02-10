import { AddressItem, AddressItemSkeleton } from "@components/address";
import { ButtonComponent } from "@components/buttons";
import { AddressCreateForm } from "@components/form";
import { useAppDispatch } from "@redux/hooks";
import { setSelectedAddress } from "@redux/slices/checkoutSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useGetUserAddressesQuery } from "@services/addressApi";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const { data: addresses, isLoading, isSuccess } = useGetUserAddressesQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSelectedAddressDefaultForUser = () => {
    if (addresses && addresses.data) {
      const selectedAddress = addresses.data.find((addr) => addr.isDefault);

      if (!selectedAddress) {
        dispatch(
          openSnackbar({
            type: "error",
            message: "Không chọn được địa chỉ nhận hàng hợp lệ!",
          })
        );

        return;
      }

      dispatch(setSelectedAddress(selectedAddress.id));
      dispatch(
        openSnackbar({
          type: "success",
          message: "Đã chọn địa chỉ nhận hàng thành công!",
        })
      );

      navigate("/checkout/payment");
    }
  };
  return (
    <div>
      <h1 className="text-lg font-bold mb-2">Select a delivery address</h1>
      <span className="font-medium opacity-70 text-sm">
        Is the address you'd like to use displayed below? If so, click the
        corresponding "Deliver to this address" button. Or you can enter a new
        delivery address.
      </span>

      {/* Render Address List for User */}
      <div className="mb-8 mt-6">
        {addresses && addresses.data && addresses?.data?.length > 0 ? (
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
            {addresses.data.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        ) : (
          ""
        )}

        {!addresses && isLoading && (
          <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <AddressItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>
      {/* Button Deliver Here */}
      <ButtonComponent onClick={handleSelectedAddressDefaultForUser}>
        Deliver Here
      </ButtonComponent>

      <AddressCreateForm refetch={() => {}} />
    </div>
  );
};

export default CheckoutAddress;
