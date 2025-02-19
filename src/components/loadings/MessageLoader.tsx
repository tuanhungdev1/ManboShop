const MessageLoader = () => {
  return (
    <div className="loader flex items-center gap-2 min-h-5">
      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce transition delay-200"></div>
      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce transition delay-500"></div>
      <div className="w-2 h-2 bg-gray-800 rounded-full animate-bounce transition delay-700"></div>
    </div>
  );
};

export default MessageLoader;
