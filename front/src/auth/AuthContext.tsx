import React, {ReactNode, createContext, useContext, useState} from 'react'

interface AuthContextValue {
  isAuthentify: boolean;
  setIsAuthentify: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthenContext = createContext<AuthContextValue | undefined>(undefined);


interface AuthProviderIpros {
  children: ReactNode
} 

export const AuthProvider = ({children}: AuthProviderIpros) => {
    const [isAuthentify, setIsAuthentify] = useState<boolean>(false)        

  return (
    <AuthenContext.Provider value={{isAuthentify, setIsAuthentify}}>
      {children}
    </AuthenContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthenContext) || { isAuthentify: false, setIsAuthentify: () => {} };
}