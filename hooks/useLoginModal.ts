import { useContext } from "react";
import { LoginModalContext } from "@/contexts/LoginModalContext";

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);

  if (!context) {
    throw new Error("A LoginModalProvider is mandatory to use useLoginModal");
  }

  return context;
};
