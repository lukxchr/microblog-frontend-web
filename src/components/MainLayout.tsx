import React, { Context, useContext, useEffect, useState } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { useAlert } from "../utils/AlertContext";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { RightSidebar } from "./RightSidebar";
import { CreatePostForm } from "./CreatePostForm";

interface MainLayoutProps {}

export const MainLayout: React.FC<MainLayoutProps> = ({}) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { setWarningAlert, setErrorAlert, setSuccessAlert } = useAlert();

  let username: string = "";
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(), //don't run if page is SSRed (no user without cookie)
  });
  if (fetching) {
  } else if (!data?.me) {
  } else {
    username = data.me.username;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <MobileSidebar
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
        username={username}
      />
      <DesktopSidebar username={username} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
            aria-label="Open sidebar"
            onClick={() => setSidebarIsOpen(true)}
          >
            <svg
              className="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </button>

          <div className="flex-1 px-4 flex justify-between bg-gray-800 border-cool-gray-100 border-b-2">
            Create here
          </div>
          {/* <CreatePostForm /> */}
        </div>

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none"
          tabIndex={0}
        >
          <div className="pt-2 pb-6 md:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Dashboard header
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* <!-- Replace with your content --> */}
              <div className="py-4 space-y-4 space-x-4">
                <button
                  className="bg-red-800"
                  onClick={() => setErrorAlert("scary error")}
                >
                  Show my an error
                </button>
                <button
                  className="bg-orange-500"
                  onClick={() => setWarningAlert("Ingoreable warning")}
                >
                  Show my a warning
                </button>
                <button
                  className="bg-green-800"
                  onClick={() => setSuccessAlert("GREAT SUCCESS !!!")}
                >
                  Great success
                </button>
              </div>
              {/* <!-- /End replace --> */}
            </div>
          </div>
        </main>
      </div>
      <RightSidebar></RightSidebar>
    </div>
  );
};
