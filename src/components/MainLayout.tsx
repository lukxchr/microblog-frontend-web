import Head from "next/head";
import React, { useState } from "react";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";
import { RightSidebar } from "./RightSidebar";

interface MainLayoutProps {
  // children: JSX.Element | JSX.Element[] | null;
  header: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, header }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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
      <Head>
        <title>{`Microblog / ${header}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MobileSidebar
        isOpen={sidebarIsOpen}
        setIsOpen={setSidebarIsOpen}
        username={username}
      />
      <DesktopSidebar username={username} />

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
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

          <div className="flex-1 px-4 flex items-center bg-gray-800 text-2xl font-semibold text-gray-100 border-gray-700 border-b-2">
            {header}
          </div>
          {/* <CreatePostForm /> */}
        </div>

        <main
          className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-800"
          tabIndex={0}
        >
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
      <RightSidebar></RightSidebar>
    </div>
  );
};
