import React, { createContext, useContext, useEffect, useState } from "react";
import { AlertType } from "../components/Alert";

type AlertContextType = {
  alert: { type: AlertType; message: string } | null;
  setWarningAlert: (message: string) => void;
  setSuccessAlert: (message: string) => void;
  setErrorAlert: (message: string) => void;
  dismissAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const AlertProvider = ({ children }: Props) => {
  const [alert, setAlert] = useState<{
    type: AlertType;
    message: string;
  } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setAlert(null), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  //wrappers for different alert types (setAlert is never called directly)
  const setWarningAlert = (message: string) =>
    setAlert({ type: "warning", message });
  const setSuccessAlert = (message: string) =>
    setAlert({ type: "success", message });
  const setErrorAlert = (message: string) =>
    setAlert({ type: "error", message });
  const dismissAlert = () => setAlert(null);

  return (
    <AlertContext.Provider
      value={{
        alert,
        setSuccessAlert,
        setWarningAlert,
        setErrorAlert,
        dismissAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext)!;
