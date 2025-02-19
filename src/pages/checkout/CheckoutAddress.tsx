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
      <h1 className="text-lg font-bold mb-2">Chọn địa chỉ giao hàng</h1>
      <span className="font-medium opacity-70 text-sm">
        Địa chỉ bạn muốn sử dụng có hiển thị bên dưới không? Nếu có, hãy nhấn
        nút "Giao hàng đến địa chỉ này" tương ứng. Hoặc bạn có thể nhập một địa
        chỉ giao hàng mới.
      </span>

      {/* Danh sách địa chỉ của người dùng */}
      <div className="mb-8 mt-6">
        {addresses && addresses.data && addresses?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {addresses.data.map((address) => (
              <AddressItem key={address.id} address={address} />
            ))}
          </div>
        ) : (
          ""
        )}

        {!addresses && isLoading && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <AddressItemSkeleton key={index} />
            ))}
          </div>
        )}
      </div>

      {/* Nút giao hàng đến địa chỉ này */}
      <ButtonComponent onClick={handleSelectedAddressDefaultForUser}>
        Giao hàng đến địa chỉ này
      </ButtonComponent>

      <AddressCreateForm refetch={() => {}} />
    </div>
  );
};

export default CheckoutAddress;
