import React from "react";
import { FaPlus } from "react-icons/fa";

function BorderWrapper({ children }: { children: React.ReactNode }) {
  const BottomLine = () => {
    return (
      <>
        <div className="hidden absolute top-[55.40rem] left-10 right-10 h-0.25 bg-[#252134] pointer-events-none xl:block" />

        <FaPlus className="hidden w-4 h-4 absolute top-[54.9375rem] left-[2.04rem] z-2 pointer-events-none xl:block text-gray-400" />

        <FaPlus className="hidden w-4 h-4 absolute top-[54.9375rem] right-[2.04rem] z-2 pointer-events-none xl:block text-gray-400" />
      </>
    );
  };
  return (
    <div className="bg-[#0E0C15] mx-10 border border-[#252134]">
      {children}
      <BottomLine />
    </div>
  );
}

export default BorderWrapper;
