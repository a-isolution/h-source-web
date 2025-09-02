interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left side image or graphic */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="text-4xl font-bold leading-tight">H-Source!</h2>
          <p className="text-lg opacity-80">Vendor Marketplace.</p>
          <img
            src="/illustration.svg" // replace with your image or graphic
            alt="Auth Illustration"
            className="w-full h-auto mt-6"
          />
        </div>
      </div>

      {/* Right side form */}
      <div className="flex items-center justify-center p-4">{children}</div>
    </div>
  );
};

export default Layout;
