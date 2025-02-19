import { useParams } from "react-router-dom";
import {
  useGetProductBySlugNameQuery,
  useGetProductsQuery,
} from "@services/productApi";
import { formatPrice } from "@utils/format";
import ProductDetailSkeleton from "@components/products/ProductDetailSkeleton";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import { isNewProduct } from "@utils/utils";
import { useEffect, useState } from "react";
import {
  ProductRequestParameters,
  ProductVariantValue,
  VariantValue,
} from "@types-d/product";
import { CiHeart } from "react-icons/ci";
import { FiChevronLeft, FiChevronRight, FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import ProductSlider from "@components/products/ProductSlider";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAddProductFavoriteMutation } from "@services/favoriteApi";
import { Favorite } from "@types-d/favorite";
import { useAppDispatch } from "@redux/hooks";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { CartItemForCreate } from "@types-d/cart";
import { useAddItemToCartMutation } from "@services/cartApi";
import { Rate } from "@components/rate";
import {
  useGetAverageRatingQuery,
  useGetFeedbacksByProductQuery,
} from "@services/feedbackApi";
import { FeedbackItemSkeleton, FeedbackList } from "@components/feedbackList";
import { CreateFeedbackForm } from "@components/form";
import { ImageLoad } from "@components/images";

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const [selectedVariants, setSelectedVariants] = useState<VariantValue[]>([]);
  const [selectedSku, setSelectedSku] = useState<string | null>("");
  const [selectedProductVariantValue, setSelectedProductVariantValue] =
    useState<ProductVariantValue | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [feedbackPageSize, setFeedbackPageSize] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentVariantImages, setCurrentVariantImages] = useState<string[]>(
    []
  );

  const handleColorVariantSelect = (variantValue: VariantValue) => {
    if (variantValue && variantValue.variantValueImages) {
      const selectedVariantImages = variantValue.variantValueImages.map(
        (img) => img.imageUrl
      );

      setCurrentVariantImages(selectedVariantImages);
      setCurrentImageIndex(0); // Reset về ảnh đầu tiên
    }
    handleVariantSelect(variantValue);
  };
  // Hàm xử lý slide ảnh
  const handleSlideImage = (direction: string) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) =>
        prev === currentVariantImages.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === 0 ? currentVariantImages.length - 1 : prev - 1
      );
    }
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleFeedbackPageSizeChange = (page: number) => {
    setFeedbackPageSize(Math.max(1, page));
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductBySlugNameQuery(slug ?? "");

  const { data: productRate } = useGetAverageRatingQuery(
    product?.data?.id ? product.data.id : skipToken
  );

  const { data: productFeedback, isLoading: isFeedbackloading } =
    useGetFeedbacksByProductQuery(
      product?.data?.id
        ? {
            productId: product.data.id,
            feedbackRequestParameters: {
              PageNumber: feedbackPageSize,
              PageSize: 5,
            },
          }
        : skipToken
    );

  const [AddProductFavorite, { data: favoriteResponse, isSuccess }] =
    useAddProductFavoriteMutation();

  const [addToCart, { isLoading: isAddingToCart }] = useAddItemToCartMutation();

  const handleAddProductFavorite = async () => {
    const favorite: Favorite = {
      productId: product?.data?.id!,
    };

    try {
      await AddProductFavorite(favorite).unwrap();
    } catch (error: any) {
      const message = error.data.Message;

      dispatch(
        openSnackbar({
          type: "error",
          message:
            message || "Không thể thêm sản phẩm vào danh sách yêu thích!",
        })
      );
    }
  };

  useEffect(() => {
    if (selectedVariants.length > 0) {
      // Tìm variant màu sắc đã chọn
      const colorVariant = selectedVariants.find(
        (variant) =>
          variant.variantId ===
          product?.data?.variants.find(
            (v) => v.name.includes("Color") || v.name.includes("Màu")
          )?.id
      );

      if (colorVariant && colorVariant.variantValueImages) {
        const newImages = colorVariant.variantValueImages.map(
          (img) => img.imageUrl
        );
        setCurrentVariantImages(newImages);
        setCurrentImageIndex(0);
      }
    }
  }, [selectedVariants, product]);

  useEffect(() => {
    if (product?.data?.variants) {
      const colorVariant = product.data.variants.find((v) =>
        ["Color", "Màu"].some((key) => v.name.includes(key))
      );

      if (colorVariant && colorVariant.values[0]) {
        const defaultImages = colorVariant.values[0].variantValueImages.map(
          (img) => img.imageUrl
        );
        setCurrentVariantImages(defaultImages);
        setCurrentImageIndex(0);

        // Tự động chọn variant màu đầu tiên
        handleColorVariantSelect(colorVariant.values[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        openSnackbar({
          type: "success",
          message: favoriteResponse.message,
        })
      );
    }
  }, [isSuccess, favoriteResponse]);
  const requestParameters = product?.data?.brand?.name
    ? ({
        brands: product.data.brand.name,
        pageNumber: 1,
        pageSize: 10,
      } as ProductRequestParameters)
    : skipToken;
  const { data: relatedProductsData } = useGetProductsQuery(requestParameters);
  const productVariants =
    product && product.data?.variants && product.data.variants.length > 0
      ? [...product.data.variants].sort((a, b) => a.name.localeCompare(b.name))
      : [];

  const handleVariantSelect = (variantValue: VariantValue) => {
    setSelectedVariants((prevVariants) => {
      const isVariantIdExists = prevVariants.some(
        (v) => v.variantId === variantValue.variantId
      );
      const isIdExists = prevVariants.some((v) => v.id === variantValue.id);

      if (isVariantIdExists) {
        // Nếu variantId đã tồn tại
        return isIdExists
          ? // Nếu id đã tồn tại, xóa tất cả các variant có cùng variantId
            prevVariants.filter((v) => v.variantId !== variantValue.variantId)
          : // Nếu id chưa tồn tại, thay thế variantValue
            [
              ...prevVariants.filter(
                (v) => v.variantId !== variantValue.variantId
              ),
              variantValue,
            ];
      }

      // Nếu variantId chưa tồn tại, thêm variantValue mới
      return [...prevVariants, variantValue];
    });
  };

  const generateSku = () => {
    const skuParts = selectedVariants.map((variant) => variant.id.toString());
    const sku = skuParts.join("-");
    setSelectedSku(sku);
  };

  const generateProductVariant = (): string => {
    let arrText: string[] = [];

    if (product && selectedProductVariantValue && selectedVariants) {
      productVariants.forEach((item) => {
        const variantName = item.name;
        const variantValue = item.values.find((vv) =>
          selectedVariants.includes(vv)
        )?.value;

        arrText = [...arrText, `${variantName} ${variantValue}`];
      });
    }

    return arrText.join(", ");
  };

  const handleAddToCart = async () => {
    if (!selectedProductVariantValue) {
      dispatch(
        openSnackbar({
          type: "error",
          message: "Vui lòng chọn một biến thể sản phẩm!",
        })
      );

      return;
    }

    const cartItem: CartItemForCreate = {
      productId: product?.data?.id!,
      productVariantValueId: selectedProductVariantValue?.id,
      quantity: quantity ?? 1,
    };

    try {
      await addToCart(cartItem).unwrap();

      dispatch(
        openSnackbar({
          type: "success",
          message: "Sản phẩm đã được thêm vào giỏ hàng!",
        })
      );
    } catch (error: any) {
      dispatch(
        openSnackbar({
          type: "error",
          message:
            error.data?.Message || "Không thể thêm sản phẩm vào giỏ hàng!",
        })
      );
    }
  };

  useEffect(() => {
    if (selectedVariants.length > 0) {
      generateSku();
    } else {
      setSelectedSku(null);
    }
  }, [selectedVariants]);

  const compareSkus = (sku1: string, sku2: string): boolean => {
    const sortedSku1 = sku1.split("-").sort().join("-");
    const sortedSku2 = sku2.split("-").sort().join("-");

    return sortedSku1 === sortedSku2;
  };

  useEffect(() => {
    if (selectedSku && selectedSku.length > 0 && product) {
      setSelectedProductVariantValue(() => {
        const productVariantValue = product.data?.variantValues.find((vv) =>
          compareSkus(vv.sku, selectedSku)
        );

        return productVariantValue ?? null;
      });
    }
  }, [selectedSku, product]);

  if (!slug) return <div>Error loading product details.</div>;

  if (isLoading) return <ProductDetailSkeleton />;
  if (error || !product) return <div>Error loading product details.</div>;

  return (
    product.data && (
      <div className="container mx-auto p-4 pt-[100px]">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Shop", path: "/collection" },
            { label: product.data.name },
          ]}
        />

        <div className="flex flex-col md:flex-row mt-10">
          {/* Product Image */}
          <div className="md:w-1/2 relative">
            <ImageLoad
              src={currentVariantImages[currentImageIndex]}
              alt={product.data.name}
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover rounded-md relative transition duration-300 ease-in-out"
            />
            <button
              onClick={() => handleSlideImage("prev")}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <FiChevronLeft className="text-2xl" />
            </button>

            <button
              onClick={() => handleSlideImage("next")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
            >
              <FiChevronRight className="text-2xl" />
            </button>
            {isNewProduct(product.data) && (
              <span className="absolute top-4 left-2 ml-2 font-medium text-white bg-green-500 px-2 py-1  text-sm">
                New
              </span>
            )}
            <div className="flex gap-2 mt-4 flex-wrap">
              {currentVariantImages.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-md overflow-hidden ${
                    currentImageIndex === index ? "border-2 border-black" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <ImageLoad
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 bg-black/10 " />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2 md:pl-6 mt-8 md:mt-0">
            <h1 className="relative">
              <span className=" text-3xl lg:text-5xl font-bold ">
                {product.data.brand?.name}
              </span>

              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {product.data.variantValues.some((vv) => vv.stock > 0) ==
                true ? (
                  <span className="text-green-500 bg-green-50 px-4 inline-block py-2 rounded-md text-sm font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 bg-red-50 px-4 inline-block py-2 rounded-md text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </h1>
            <h1 className="text-xl flex items-center font-semibold mt-4">
              <span>{product.data.name}</span>
            </h1>

            <div className="mt-4 pb-2 flex items-center gap-4">
              {productRate?.data !== undefined && (
                <Rate numberRate={productRate.data} size="large" />
              )}

              <span className="text-lg select-none mt-1 opacity-65 font-medium">{`${Number(
                productRate?.data
              ).toFixed(1)} (${
                productFeedback?.pagination?.totalCount
              } Reviews)`}</span>
            </div>

            <div className="flex items-center mt-4">
              <span className="text-xl font-semibold text-primary-900">
                {formatPrice(
                  selectedProductVariantValue?.price ?? product.data.price
                )}
              </span>

              {product.data.oldPrice > product.data.price && (
                <>
                  <span className="ml-2 text-gray-500 line-through">
                    {formatPrice(
                      selectedProductVariantValue?.oldPrice ??
                        product.data.oldPrice
                    )}
                  </span>
                  {/* Tính toán và hiển thị phần trăm giảm giá */}
                  {selectedProductVariantValue ? (
                    <span className="ml-2 text-red-500 font-semibold">
                      {`-${Math.round(
                        ((selectedProductVariantValue.oldPrice! -
                          selectedProductVariantValue.price) /
                          selectedProductVariantValue.oldPrice!) *
                          100
                      )}%`}
                    </span>
                  ) : (
                    <span className="ml-2 text-red-500 font-semibold">
                      {`-${Math.round(
                        ((product.data.oldPrice - product.data.price) /
                          product.data.oldPrice) *
                          100
                      )}%`}
                    </span>
                  )}
                </>
              )}
            </div>
            <h2 className="text-[15px] lg:text-md text-gray-900 font-medium mt-4">
              {product.data.description}
            </h2>

            {/* Variants */}
            <div className="mt-4">
              <span className="font-semibold text-xl">
                {productVariants.map((variant) => (
                  <div key={variant.id} className="mt-4">
                    <span className="font-semibold text-xl">
                      {variant.name}
                    </span>
                    <div className="flex mt-4 gap-2">
                      {variant.values.map((item) => (
                        <div
                          key={item.id}
                          className={`border rounded-md cursor-pointer mr-2 transition-transform duration-300 ${
                            selectedVariants.includes(item)
                              ? "outline-[1px] outline scale-105"
                              : ""
                          }`}
                          onClick={() =>
                            variant.name.includes("Màu")
                              ? handleColorVariantSelect(item)
                              : handleVariantSelect(item)
                          }
                        >
                          {item.variantValueImages.length > 0 ? (
                            <ImageLoad
                              src={item.variantValueImages[0].imageUrl}
                              alt={item.value}
                              className="w-[50px] h-[50px] object-cover rounded"
                            />
                          ) : (
                            <span className="px-4 py-2 inline-block">
                              {item.value}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </span>
              {selectedProductVariantValue && selectedVariants && (
                <div className="mt-6 font-medium">
                  Phân loại: {generateProductVariant()}
                </div>
              )}
            </div>

            <div className="flex mt-4 items-center gap-2 font-medium text-base">
              <span className="">Số lượng sản phẩm: </span>
              <span className="">
                {selectedProductVariantValue
                  ? selectedProductVariantValue.stock
                  : product.data.quantity}
              </span>
            </div>

            {/* Add to Cart Button */}
            <div className="flex items-center mt-6">
              <div className="flex items-center h-full overflow-hidden rounded-md border-black border-[2px]">
                <button
                  className=" px-4 py-4 items-center flex justify-center hover:bg-slate-100 transition-all duration-300"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <FiMinus />
                </button>
                <input
                  type="number"
                  value={quantity} // Use state to manage quantity
                  onChange={(e) => setQuantity(Number(e.target.value))} // Update quantity on change
                  className="border-none outline-none w-12 text-center h-12"
                  min={1}
                />
                <button
                  className="px-3 py-4 hover:bg-slate-100 transition-all duration-300"
                  onClick={() => handleQuantityChange(1)}
                >
                  <GoPlus />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="bg-primary-900 hover:bg-gray-800 border-[2px] border-black hover:border-gray-800 transition-all  duration-300 flex-1 text-white px-4 h-12 rounded-md ml-4"
              >
                {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </button>
              <div className="ml-4" onClick={handleAddProductFavorite}>
                <button className="border-[2px] border-black hover:text-red-500 duration-300 transition-all hover:text-[35px] rounded-md h-12 w-12 flex items-center justify-center text-[30px]">
                  <CiHeart />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12">
          {/* Attributes */}
          <div className="mt-8">
            <h3 className="font-semibold text-[20px]">Thông tin sản phẩm:</h3>
            <ul className="list-disc pl-5 flex flex-col gap-4 mt-4">
              {product.data.attributes.map((attr) => (
                <li key={attr.id}>
                  <strong>{attr.name}: </strong>
                  {attr.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pb-10">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold">Đánh giá sản phẩm</h1>
            <span className="text-xl font-medium opacity-50">{`(${productFeedback?.pagination?.totalCount} Reviews)`}</span>
          </div>

          {!isFeedbackloading &&
            productFeedback &&
            productFeedback?.data &&
            productFeedback.pagination && (
              <FeedbackList
                onPageChange={handleFeedbackPageSizeChange}
                feedbackList={productFeedback?.data}
                pagination={productFeedback?.pagination}
              />
            )}

          {isFeedbackloading && (
            <div className="flex flex-col">
              {[...Array(4)].map((_, index) => (
                <FeedbackItemSkeleton key={index} />
              ))}
            </div>
          )}

          <div>
            <CreateFeedbackForm productId={product.data.id} />
          </div>
        </div>

        <div className="mt-20">
          {relatedProductsData && (
            <ProductSlider
              title="Related Products"
              products={relatedProductsData.data ?? []}
              viewMode="grid"
            />
          )}
        </div>
      </div>
    )
  );
};

export default ProductDetail;
