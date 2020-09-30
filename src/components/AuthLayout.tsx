import React, { Children } from "react";

interface AuthLayoutProps {
  children: JSX.Element | JSX.Element[] | null;
  header: string;
  subheader?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  header,
  subheader,
}) => {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            {/* <img
              className="h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
              alt="Workflow"
            /> */}
            <svg
              className="h-24 -ml-12"
              // width="177"
              // height="100"
              // viewBox="0 0 177 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M88 32.5C88 42.165 80.165 50 70.5 50H53V32.5C53 22.835 60.835 15 70.5 15C80.165 15 88 22.835 88 32.5Z"
                fill="#5850ec"
              />
              <path
                d="M88 67.5C88 57.835 95.835 50 105.5 50H123V67.5C123 77.165 115.165 85 105.5 85C95.835 85 88 77.165 88 67.5Z"
                fill="#5850ec"
              />
              <path
                d="M53 67.5C53 77.165 60.835 85 70.5 85H88V67.5C88 57.835 80.165 50 70.5 50C60.835 50 53 57.835 53 67.5Z"
                fill="#5850ec"
              />
              <path
                d="M123 32.5C123 22.835 115.165 15 105.5 15H88V32.5C88 42.165 95.835 50 105.5 50C115.165 50 123 42.165 123 32.5Z"
                fill="#c81e1e"
              />
            </svg>
            <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">
              {header}
            </h2>
            <p className="mt-2 text-sm leading-5 text-gray-600 max-w">
              {subheader}
            </p>
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
          src="https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2559&q=80"
          alt=""
        />
      </div>
    </div>
  );
};
