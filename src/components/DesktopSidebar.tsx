import Link from "next/link";
import React from "react";
import { useLogoutMutation } from "../generated/graphql";
import { useAlert } from "../utils/AlertContext";
import { getInitialsForUsername } from "../utils/getInitialsForUsername";

interface DesktopSidebarProps {
  username?: string;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ username }) => {
  const [, logout] = useLogoutMutation();
  const { setSuccessAlert } = useAlert();
  const logoutUser = () => {
    logout();
    setSuccessAlert("You're logged out");
  };

  return (
    <div className="hidden z-10 md:flex md:flex-shrink-0 border-gray-700 border-r-2">
      <div className="flex flex-col w-64">
        {/* <!-- Sidebar component, swap this element with another sidebar if you like --> */}
        <div className="flex flex-col h-0 flex-1 bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg"
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
              <a
                href="#"
                className="group flex items-center px-2 py-4 text-lg leading-5 font-semibold text-white rounded-md bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: home --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </a>

              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: users --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Team
              </a>

              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: folder --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
                Projects
              </a>

              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: calendar --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Calendar
              </a>

              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: inbox --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                Documents
              </a>

              <a
                href="#"
                className="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150"
              >
                {/* <!-- Heroicon name: chart-bar --> */}
                <svg
                  className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Reports
              </a>
            </nav>
          </div>

          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            {/* <a href="#" className="flex-shrink-0 w-full group block"> */}
            <div className="flex items-center">
              <div className="inline-block h-16 w-16 rounded-sm overflow-hidden">
                <svg
                  width="64px"
                  height="64px"
                  viewBox="0 0 64 64"
                  version="1.1"
                >
                  <rect
                    fill="#5850ec"
                    cx="32"
                    width="64"
                    height="64"
                    cy="32"
                    r="32"
                  />
                  <text
                    x="50%"
                    y="50%"
                    alignmentBaseline="middle"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="400"
                    dy=".1em"
                    dominantBaseline="middle"
                    fill="#F7FAFC"
                  >
                    {getInitialsForUsername(username)}
                  </text>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-white">
                  {username || "Anonymous"}
                </p>
                {username ? (
                  <a
                    className="text-xs leading-4 font-medium text-gray-300 group-hover:text-gray-200 transition ease-in-out duration-150 cursor-pointer"
                    onClick={() => logoutUser()}
                  >
                    Log out
                  </a>
                ) : (
                  <Link href="/login">
                    <a className="text-xs leading-4 font-medium text-gray-300 group-hover:text-gray-200 transition ease-in-out duration-150">
                      Log in
                    </a>
                  </Link>
                )}
              </div>
            </div>
            {/* </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};
