const CheckoutAddress = () => {
  return (
    <div>
      <h1 className="text-lg font-bold mb-2">Select a delivery address</h1>
      <span className="font-medium opacity-70 text-sm">
        Is the address you'd like to use displayed below? If so, click the
        corresponding "Deliver to this address" button. Or you can enter a new
        delivery address.
      </span>

      {/* Render Address List for User */}
      <div className="mb-8 mt-6">helo</div>
      {/* Button Deliver Here */}
      <div className="bg-black rounded-lg flex items-center justify-center h-[54px]  text-gray-300 hover:text-white cursor-pointer font-medium transition-all duration-200 hover:shadow-xl text-sm w-[300px]">
        Deliver Here
      </div>
    </div>
  );
};

export default CheckoutAddress;
