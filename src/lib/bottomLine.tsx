import { FaPlus } from "react-icons/fa";

export const BottomLine = ({ topLine, topLeft, topRight }: { topLine: string, topLeft: string, topRight: string }) => {

  return (
    <>
      <div className={`hidden absolute ${topLine} left-10 right-10 h-0.25 bg-[#252134] pointer-events-none xl:block`} />

      <FaPlus className={`hidden w-4 h-4 absolute ${topLeft} left-[2.04rem] z-2 pointer-events-none xl:block text-gray-400`} /> 

      <FaPlus className={`hidden w-4 h-4 absolute ${topRight} right-[2.04rem] z-2 pointer-events-none xl:block text-gray-400`} />
    </>
  );
};
