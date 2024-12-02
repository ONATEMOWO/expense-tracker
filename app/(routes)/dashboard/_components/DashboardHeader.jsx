import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardHeader = () => {
  return (
    <div className="p-5 xshadow-sm border-b flex justify-between">
      <div></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default DashboardHeader;
