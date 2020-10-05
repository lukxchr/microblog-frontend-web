import React from "react";
import Link from "next/link";

interface RightSidebarProps {}

export const RightSidebar: React.FC<RightSidebarProps> = ({}) => {
  return (
    <div className="hidden z-10 md:flex md:flex-shrink-0">
      <div className="flex flex-col w-80">
        <form className="pt-4 pb-2 px-2 sm:flex sm:max-w-md bg-gray-800">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            type="search"
            id="search"
            required
            className="appearance-none min-w-0 w-full bg-gray-700 border border-transparent rounded-md py-2 px-4 text-base leading-6 text-gray-100 placeholder-gray-500 focus:outline-none focus:shadow-outline-gray focus:placeholder-gray-400 transition duration-150 ease-in-out"
            placeholder="Search..."
          />
        </form>
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"></div>

          <div className="flex-shrink-0 flex bg-gray-700 p-4"></div>
        </div>
      </div>
    </div>
  );
};
