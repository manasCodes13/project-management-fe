"use client";
import React, { useEffect } from "react";
import Sidebar from "./components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex w-screen h-screen bg-white">
      <div>
        <Sidebar />
      </div>
      {children}
    </section>
  );
};

export default Layout;
