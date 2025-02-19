import { useEffect } from "react";
import { useGetProductsQuery } from "@services/productApi";
import { useAppSelector } from "@redux/hooks";
import { useSearchParams } from "react-router-dom";
import ProductSkeleton from "./ProductSkeleton";
import { Pagination } from "@mui/material";
import ProductCard from "./ProductCard";
import { MetaData } from "@types-d/type";
import { formatQueryParams } from "@utils/queryParams";

interface ProductListProps {
  viewMode: "grid" | "list";
  onPaginationChange: (metaData: MetaData) => void;
}

const ProductList = ({ viewMode, onPaginationChange }: ProductListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = 9;

  const filters = useAppSelector((state) => state.filter);

  console.log(formatQueryParams(filters, currentPage, pageSize));
  // Query products với các params đã được format đúng
  const { data, isLoading, isFetching, isSuccess } = useGetProductsQuery(
    formatQueryParams(filters, currentPage, pageSize)
  );

  // Cập nhật metadata pagination khi data thay đổi
  useEffect(() => {
    if (isSuccess && data?.pagination) {
      onPaginationChange(data.pagination);
    }
  }, [isSuccess, data?.pagination, onPaginationChange]);

  // Reset về trang 1 khi filter thay đổi
  useEffect(() => {
    setSearchParams((prev) => {
      if (currentPage !== 1) {
        prev.set("page", "1");
      }
      return prev;
    });
  }, [JSON.stringify(filters)]); // Dependency là filters được stringify

  const handlePageChange = (_: any, page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
  };

  // Render loading skeleton
  if (isLoading) {
    return (
      <div
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        } gap-6`}
      >
        {[...Array(pageSize)].map((_, index) => (
          <ProductSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // Render no results
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-lg font-medium text-gray-600">
          Không tìm thấy sản phẩm phù hợp
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Filter Results */}

      <div className="flex flex-col gap-6">
        {/* Products Grid */}
        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          } gap-6`}
        >
          {data.data.map((product) => (
            <div
              key={product.id}
              className={`${
                isFetching ? "opacity-50" : "opacity-100"
              } transition-opacity duration-300`}
            >
              <ProductCard product={product} viewMode={viewMode} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {data.pagination && (
          <div className="flex justify-center mt-8">
            <Pagination
              count={Math.ceil(data.pagination.totalCount / pageSize)}
              page={currentPage}
              onChange={(_, page) => handlePageChange(_, page)}
              color="primary"
              showFirstButton
              showLastButton
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: "0.375rem", // rounded-md
                  border: "1px solid #000", // Thêm border nếu cần
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
