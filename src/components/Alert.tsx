import React, { useEffect } from "react";
import { useAlert } from "../utils/AlertContext";
import { Transition } from "@tailwindui/react";

export type AlertType = "success" | "warning" | "error";

interface AlertProps {}

export const Alert: React.FC<AlertProps> = () => {
  const { alert, dismissAlert } = useAlert();

  const colors = {
    success: { text: "green-800", background: "green-200", icon: "green-300" },
    warning: {
      text: "orange-800",
      background: "orange-200",
      icon: "orange-300",
    },
    error: { text: "red-900", background: "red-300", icon: "red-400" },
  };

  return (
    <Transition show={alert !== null}>
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="translate-y-16"
        enterTo="translate-y-0"
      >
        {alert === null ? null : (
          <div className="absolute bottom-4 flex justify-center w-full md:w-auto md:left-80 md:right-96">
            <div
              className={`w-10/12 md:w-full_ z-10 rounded-md bg-${
                colors[alert.type].background
              } p-4`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className={`h-5 w-5 text-${colors[alert.type].icon}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {alert.type === "success" && (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    )}
                    {alert.type === "warning" && (
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    )}
                    {alert.type === "error" && (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm leading-5 font-medium text-${
                      colors[alert.type].text
                    }`}
                  >
                    {alert.message}
                  </div>
                </div>
                <div className="ml-auto pl-3">
                  <div className="-mx-1.5 -my-1.5">
                    <button
                      onClick={() => dismissAlert()}
                      className={`inline-flex rounded-md p-1.5 text-${
                        colors[alert.type].text
                      } hover:bg-${
                        colors[alert.type].icon
                      } focus:outline-none focus:bg-${
                        colors[alert.type].icon
                      } transition ease-in-out duration-150`}
                      aria-label="Dismiss"
                    >
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition.Child>
    </Transition>
  );
};
