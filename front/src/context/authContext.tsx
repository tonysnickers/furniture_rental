import { createContext, useContext } from "react";

interface AuthContextValue {
    isAuthentify: boolean;
    setIsAuthentify: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthenContext = createContext<AuthContextValue>({ isAuthentify: false, setIsAuthentify: () => {} });

