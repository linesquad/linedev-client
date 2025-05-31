import React from "react";
import { BottomLine } from "../lib/bottomLine";

function BorderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0E0C15] mx-10 border border-[#252134]">
      {children}
      <BottomLine topLine="top-[55.40rem]" topLeft="top-[54.9375rem]" topRight="top-[54.9375rem]" />
      <BottomLine topLine="top-[162.40rem]" topLeft="top-[161.9375rem]" topRight="top-[161.9375rem]" />  
    </div>
  );
}

export default BorderWrapper;
