import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FiChevronDown, FiPlus, FiMinus } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectProductTypes,
  toggleProductType,
} from "@redux/slices/filterSlice";
import CategoryFilterSkeleton from "./CategoryFilterSkeleton";
import { useGetCategoriesQuery } from "@services/categoryApi";
import Checkbox from "@components/checkbox/Checkbox";
import { Category } from "@types-d/category";

const ProductTypeFilter = () => {
  const dispatch = useAppDispatch();
  const selectedProductTypes = useAppSelector(selectProductTypes);
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const {
    data: categoriesResponse,
    isLoading,
    error,
  } = useGetCategoriesQuery({
    pageSize: 100,
    pageNumber: 1,
    orderBy: "ASC",
  });

  if (isLoading) {
    return <CategoryFilterSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 font-medium">
        Có lỗi xảy ra khi tải dữ liệu danh mục
      </div>
    );
  }

  const organizeCategories = (categories: Category[]) => {
    const categoryMap = new Map();
    const rootCategories: Category[] = [];

    categories.forEach((category) => {
      categoryMap.set(category.id, { ...category, subCategories: [] });
    });

    categories.forEach((category) => {
      const categoryWithSubs = categoryMap.get(category.id);
      if (category.parentCategoryId === null) {
        rootCategories.push(categoryWithSubs);
      } else {
        const parentCategory = categoryMap.get(category.parentCategoryId);
        if (parentCategory) {
          parentCategory.subCategories.push(categoryWithSubs);
        }
      }
    });

    return rootCategories;
  };

  const handleProductTypeChange = (typeId: string) => {
    dispatch(toggleProductType(typeId));
  };

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategory = (category: Category) => {
    const hasSubCategories =
      category.subCategories && category.subCategories.length > 0;
    const isExpanded = expandedCategories.includes(category.id);

    return (
      <div key={category.id} className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Checkbox
            label={category.name}
            isChecked={selectedProductTypes.includes(category.name.toString())}
            onClick={() => handleProductTypeChange(category.name.toString())}
            classname={
              selectedProductTypes.includes(category.name.toString())
                ? "font-medium"
                : ""
            }
          />
          {hasSubCategories && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCategory(category.id);
              }}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {isExpanded ? (
                <FiMinus className="text-[16px]" />
              ) : (
                <FiPlus className="text-[16px]" />
              )}
            </button>
          )}
        </div>

        {/* Sub Categories */}
        {hasSubCategories && isExpanded && (
          <div className="ml-6 flex flex-col gap-3">
            {category.subCategories &&
              category.subCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className="flex items-center justify-between"
                >
                  <Checkbox
                    label={subCategory.name}
                    isChecked={selectedProductTypes.includes(
                      subCategory.name.toString()
                    )}
                    onClick={() =>
                      handleProductTypeChange(subCategory.name.toString())
                    }
                    classname={
                      selectedProductTypes.includes(subCategory.name.toString())
                        ? "font-medium"
                        : ""
                    }
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  };

  // Get only root categories (categories with no parent)
  const rootCategories = categoriesResponse?.data
    ? organizeCategories(categoriesResponse.data)
    : [];

  return (
    <Accordion
      expanded={isExpanded}
      onChange={() => setIsExpanded(!isExpanded)}
      elevation={0}
      sx={{
        "&.MuiAccordion-root": {
          borderRadius: 0,
          borderBottom: "1px solid #eee",
        },
        "&.MuiAccordion-root:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<FiChevronDown className="text-[20px] text-black" />}
        sx={{
          padding: "16px 0",
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "& .MuiAccordionSummary-expandIconWrapper": {
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          },
        }}
      >
        <span className="font-bold text-[17px]">Danh mục</span>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "0 0 16px 0" }}>
        <div className="flex flex-col gap-4">
          {rootCategories.map((category) => renderCategory(category))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default ProductTypeFilter;
