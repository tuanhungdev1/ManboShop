const AddressItemSkeleton = () => {
  return (
    <div className="px-5  py-4 text-sm font-medium bg-gray-100 rounded-lg animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 bg-gray-200 rounded"></div>
        <div className="h-5 w-5 bg-gray-200 rounded"></div>
      </div>
      <div className="h-4 w-2/3 bg-gray-200 rounded mt-4"></div>
      <div className="flex gap-4 mt-6">
        <div className="h-10 flex-1 bg-gray-200 rounded"></div>
        <div className="h-10 flex-1 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default AddressItemSkeleton;
