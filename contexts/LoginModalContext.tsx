import { createContext, ReactNode, useState } from "react";

type LoginModalContextData = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

export const LoginModalContext = createContext<LoginModalContextData>(
  {} as LoginModalContextData
);

type LoginModalProviderProps = {
  children: ReactNode;
};

export const LoginModalProvider = ({ children }: LoginModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <LoginModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};
