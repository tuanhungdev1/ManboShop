import { ProductCard, ProductSkeleton } from "@components/products";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import {
  useGetFavoritesProductQuery,
  useRemoveProductFavoriteMutation,
} from "@services/favoriteApi";
import { Favorite } from "@types-d/favorite";
import { useEffect } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { TfiFaceSad } from "react-icons/tfi";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const {
    data: favoritesProduct,
    isLoading,
    isFetching,
    refetch,
  } = useGetFavoritesProductQuery();

  const [removeFavoriteProduct, { data, isSuccess }] =
    useRemoveProductFavoriteMutation();

  const handleRemoveFavoriteProduct = async (productId: number) => {
    const favoriteProduct: Favorite = {
      productId: productId,
    };

    try {
      await removeFavoriteProduct(favoriteProduct).unwrap();
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            error.data.Message ||
            "Không thể xóa sản phẩm khỏi danh sách yêu thích",
        })
      );
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          type: "success",
          message: data.message,
        })
      );

      refetch();
    }
  }, [isSuccess, data?.message, data]);

  if (isLoading) {
    return (
      <div
        className={`grid ${"grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"} gap-6`}
      >
        {[...Array(12)].map((_, index) => (
          <ProductSkeleton key={index} viewMode={"grid"} />
        ))}
      </div>
    );
  }

  // Render no results
  if (!favoritesProduct?.data || favoritesProduct.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="text-[80px] mb-6 opacity-50">
          <TfiFaceSad />
        </div>

        <p className="text-lg font-medium text-gray-600">
          Danh sách sản phẩn yêu thích không có sản phẩm!
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid ${"grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} gap-6`}
    >
      {favoritesProduct.data.map((product) => (
        <div
          key={product.id}
          onClick={() => handleRemoveFavoriteProduct(product.id)}
          className={`relative group ${
            isFetching ? "opacity-50" : "opacity-100"
          } transition-opacity duration-300`}
        >
          <ProductCard product={product} viewMode={"grid"} />

          <div className="absolute top-2 text-[20px] flex items-center justify-center bg-gray-50 rounded-full w-[40px] h-[40px] transition group duration-200 text-red-400 opacity-0 group-hover:opacity-100 cursor-pointer right-2">
            <MdOutlineDeleteOutline />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
