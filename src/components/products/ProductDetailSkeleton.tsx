import Breadcrumb from "@components/breadcrumb/Breadcrumb";


const ProductDetailSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
    <div className="mb-10">
      <Breadcrumb items={[
        { label: "Home" },
        { label: "Shop" },
        { label: "Loading..." }
      ]} />
      </div>
      <div className="flex flex-col md:flex-row">
        {/* Skeleton for Product Image */}
        <div className="md:w-1/2">
          <div className="bg-gray-200 h-[600px] rounded-md animate-pulse"></div>
        </div>

        {/* Skeleton for Product Info */}
        <div className="md:w-1/2 md:pl-6 mt-4 sm:mt-0">
          <div className="bg-gray-200 h-8 w-3/4 mb-4 animate-pulse"></div>
          <div className="bg-gray-200 h-6 w-1/2 mb-4 animate-pulse"></div>
          <div className="flex items-center mt-4">
            <div className="bg-gray-200 h-8 w-1/4 animate-pulse"></div>
            <div className="bg-gray-200 h-8 w-1/4 ml-2 line-through animate-pulse"></div>
          </div>
          <div className="bg-gray-200 h-[100px] w-full animate-pulse mt-4"></div>
          <div className="mt-4">
            <div className="font-semibold bg-gray-200 h-8 w-1/5 animate-pulse"></div>
            <div className="flex mt-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-md border-2  mr-2 bg-gray-200 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
          <div className="bg-gray-200 h-8 w-1/5 animate-pulse"></div>
            <div className="flex mt-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-200 h-8 w-8 rounded-md mr-2 animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="bg-gray-200 h-10 w-1/2 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Skeleton for Additional Information */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold bg-gray-200 h-6 w-1/4 animate-pulse"></h3>
        <p className="mt-2 bg-gray-200 h-[200px] w-full animate-pulse"></p>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
