import React from "react";
import Header from "./header";
import Navigation from "./navigation";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

interface IContainer {
  children: React.ReactNode;
}

const Container = ({ children }: IContainer) => {
  const pathName = usePathname();

  return (
    <main className="w-full h-full bg-white dark:bg-black">
      <Header />
      <Sidebar />
      <section
        className={`px-2 py-5 max-w-[976px] mx-auto ${
          pathName !== "/" && " lg:ml-[42rem]"
        }`}
      >
        {children}
      </section>
      <Navigation />
    </main>
  );
};

export default Container;
