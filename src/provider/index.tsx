"use client";

import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query.provider";
import { Toaster } from "sonner";

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    // <ThemeProvider enableSystem={true} attribute="class">
    // </ThemeProvider>
    <ReactQueryProvider>
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </ReactQueryProvider>
  );
};

export default RootProvider;
