interface ProductSkeletonProps {
  viewMode: 'grid' | 'list';
}

const ProductSkeleton = ({ viewMode }: ProductSkeletonProps) => {
  return (
    <div className={`animate-pulse ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
      {/* Image Skeleton */}
      <div className={`bg-gray-200 rounded-md ${
        viewMode === 'list' ? 'w-[300px] aspect-[3/4]' : 'aspect-[3/4]'
      }`}></div>

      {/* Content Skeleton */}
      <div className={`${viewMode === 'list' ? 'flex-1 py-4' : 'mt-3'} space-y-3`}>
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        
        {/* Price */}
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>

        {/* Description - Only in list view */}
        {viewMode === 'list' && (
          <>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-10 bg-gray-200 rounded w-32 mt-4"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductSkeleton;