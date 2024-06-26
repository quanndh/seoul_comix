"use client";
import { TrpcProvider } from "@/utils/trpc-provider";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <TrpcProvider>
      <ToastContainer />

      <div className="p-6">{children}</div>
    </TrpcProvider>
  );
};

export default Layout;
