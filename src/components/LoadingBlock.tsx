const LoadingBlock = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      <p className="text-emerald-600 font-medium animate-pulse">
        資料載入中...
      </p>
    </div>
  );
};

export default LoadingBlock;
