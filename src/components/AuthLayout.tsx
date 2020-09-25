import React, { Children } from "react";

interface AuthLayoutProps {
  children: JSX.Element | JSX.Element[] | null;
  header: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, header }) => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              {header}
            </h2>
          </div>
          <div className="mt-0">
            <div>
              <div>
                <div className="mt-1 grid grid-cols-3 gap-3"></div>
              </div>
            </div>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
