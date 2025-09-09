import Spinner from "./spinner";

const PageLoader = () => (
  <div className="absolute w-full h-full flex items-center justify-center bg-white">
    <Spinner className="w-6 h-6 text-[#7c56fe]" />
  </div>
);

export default PageLoader;
