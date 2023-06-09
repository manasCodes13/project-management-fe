import React from "react";
import Sidear from "./components/Sidear";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div>
        <Sidear />
      </div>
      {children}
    </div>
  );
};

export default Layout;
