const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center gap-2">
      {" "}
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-slate-200"></div>
      Loading...
    </div>
  );
};
export default Loading;
