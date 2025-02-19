import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "@services/categoryApi";
import { Category } from "@types-d/category";
import { SkeletonMenu } from "./SkeletonMenu";
import { useAppDispatch } from "@redux/hooks";
import { toggleProductType } from "@redux/slices/filterSlice";

export const MegaMenu = () => {
  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useGetCategoriesQuery({
    orderBy: "asc",
    pageNumber: 1,
    pageSize: 1000,
  });

  const dispatch = useAppDispatch();
  const organizeCategories = (categories: Category[]) => {
    const rootCategories = categories.filter(
      (category) => category.parentCategoryId === null
    );

    // Map qua từng danh mục cha để thêm subCategories
    return rootCategories.map((rootCategory) => {
      // Lấy các danh mục con cấp 1
      const level1Categories = categories.filter(
        (cat) => cat.parentCategoryId === rootCategory.id
      );

      return {
        ...rootCategory,
        subCategories: level1Categories,
      };
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 left-1/2 transform -translate-x-1/2 w-[1200px] max-w-[90vw] bg-white shadow-lg top-full">
        <div className="p-8">
          <div className="grid grid-cols-4 gap-8">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="space-y-4">
                <SkeletonMenu className="h-6 w-24" />
                <div className="space-y-2">
                  {[...Array(6)].map((_, idx) => (
                    <SkeletonMenu key={idx} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return null;
  }

  const rootCategories = categoriesResponse?.data
    ? organizeCategories(categoriesResponse.data)
    : [];

  return (
    <div className="absolute pb-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all mt-14 group-hover:mt-0 duration-300 left-1/2 transform -translate-x-1/2 w-[1200px] max-w-[90vw] bg-white shadow-lg top-full">
      <div className="p-8">
        <div className="grid grid-cols-4 gap-x-8 gap-y-6">
          {rootCategories.map((category) => (
            <div key={category.id} className="flex flex-col">
              {/* Category Title */}
              <h3 className="font-bold text-gray-800 mb-4 text-base">
                {category.name}
              </h3>

              {/* Main Categories */}
              {category.subCategories && category.subCategories.length > 0 && (
                <div className="flex-1">
                  <ul className="space-y-3">
                    {category.subCategories.map((subCategory) => (
                      <li key={subCategory.id} className="group/item">
                        <Link
                          to={`/collection`}
                          onClick={() =>
                            dispatch(toggleProductType(subCategory.name))
                          }
                          className="text-gray-500 hover:text-gray-900 text-sm block transition-colors duration-200"
                        >
                          {subCategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Featured Section - Hiển thị các danh mục có danh mục con */}
              {/* {category.subCategories && category.subCategories.some(cat => cat.subCategories && cat.subCategories?.length && cat.subCategories?.length > 0) && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="font-bold text-gray-800 mb-3 text-sm">
                    Featured
                  </h4>
                  <ul className="space-y-2">
                    {category.subCategories
                      .filter(cat => cat.subCategories && cat.subCategories?.length && cat.subCategories?.length > 0)
                      .slice(0, 3)
                      .map((featuredCat) => (
                        <li key={featuredCat.id}>
                          <Link
                            to={`/category/${featuredCat.id}`}
                            className="text-gray-500 hover:text-gray-700 text-sm block transition-colors duration-200"
                          >
                            {featuredCat.name}
                          </Link>
                        </li>
                    ))}
                  </ul>
                </div>
              )} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
