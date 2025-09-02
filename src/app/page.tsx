import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-2xl font-bold">Welcome to the Home Page</div>
      <Image
        src="/images/home-image.png"
        alt="Home Image"
        width={500}
        height={300}
      />

      <Link href={"/login"}>Login</Link>
      <Link href={"/register"}>Register</Link>

      <div className="text-lg">Enjoy your stay!</div>
      <div className="text-sm text-gray-500">
        © 2023 Your Company/Organization
      </div>
    </div>
  );
}
