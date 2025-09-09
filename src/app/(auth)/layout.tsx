import PublicAuthLayout from "@/layouts/public-layout";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <PublicAuthLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left side image or graphic changes */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 text-white p-10">
          <div className="text-center space-y-6 max-w-md">
            <h2 className="text-4xl font-bold leading-tight">H-Source!</h2>
            <p className="text-lg opacity-80">Vendor Marketplace.</p>
            <Image
              src="/illustration.svg"
              alt="Auth Illustration"
              className="w-full h-auto mt-6"
              width={12}
              height={12}
            />
          </div>
        </div>

        {/* Right side form */}
        <div className="flex items-center justify-center p-4">{children}</div>
      </div>
    </PublicAuthLayout>
  );
};

export default Layout;
