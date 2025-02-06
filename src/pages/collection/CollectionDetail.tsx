import { useState, useEffect } from "react";
import { FilterResults, ProductFilter, ProductSort } from "@components/filters";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { FiFilter } from "react-icons/fi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import { useAppDispatch } from "@redux/hooks";
import { resetFilters } from "@redux/slices/filterSlice";
import { ProductList } from "@components/products";
import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useWindowSize } from "@hooks/useWindowSize";
import { MetaData } from "@types-d/type";

const CollectionDetail = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [pagination, setPagination] = useState<MetaData | null>(null);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();

  useEffect(() => {
    if (width >= 1024) {
      setIsFilterOpen(false);
      document.body.style.overflow = "unset";
    }
  }, [width]);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handlePaginationChange = (metaData: MetaData) => {
    setPagination(metaData);
  };
  return (
    <div className="container mx-auto py-6 px-4">
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        className="mb-8"
      >
        <Link
          to="/"
          className="text-gray-600 hover:text-primary-900 text-sm font-medium"
        >
          Shop
        </Link>
        <span className="text-sm text-gray-600 font-medium">All Products</span>
      </Breadcrumbs>

      {/* Main Content */}
      <div className="lg:grid lg:grid-cols-[280px,1fr] lg:gap-8 mt-10">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block">
          <ProductFilter />
        </div>

        {/* Products Section */}
        <div className="">
          {/* Header Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 ${
                    viewMode === "grid" ? "text-primary-900" : "text-gray-400"
                  }`}
                >
                  <BsGrid3X3Gap className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 ${
                    viewMode === "list" ? "text-primary-900" : "text-gray-400"
                  }`}
                >
                  <BsListUl className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {`Showing ${pagination?.currentPage} – ${pagination?.totalPage} of ${pagination?.totalCount} results`}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <ProductSort onSortChange={() => {}} />
              <button
                onClick={toggleFilter}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded"
              >
                <FiFilter className="text-lg" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Filter Results */}
          <div className="mb-6">
            <FilterResults />
          </div>

          {/* Products Grid */}
          <ProductList
            viewMode={viewMode}
            onPaginationChange={handlePaginationChange}
          />
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <div
        className={`fixed lg:hidden inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
          isFilterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleFilter}
      >
        <div
          className={`fixed top-0 right-0 h-full w-[85vw] md:w-[60vw] bg-white transform transition-transform duration-300 flex flex-col ${
            isFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Filter Header */}
          <div className="flex-none flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-medium">Filters</h2>
            <button
              onClick={toggleFilter}
              className="p-2 text-2xl"
              aria-label="Close filter"
            >
              <IoMdClose />
            </button>
          </div>

          {/* Filter Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <ProductFilter />
          </div>

          {/* Filter Actions */}
          <div className="flex-none p-4 bg-white border-t">
            <div className="flex gap-4">
              <button
                className="flex-1 py-3 px-4 border rounded-md text-center"
                onClick={() => dispatch(resetFilters())}
              >
                Reset
              </button>
              <button
                className="flex-1 py-3 px-4 bg-black text-white rounded-md text-center"
                onClick={toggleFilter}
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionDetail;
