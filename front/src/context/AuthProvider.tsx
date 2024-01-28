import React, {ReactNode, useState} from 'react'
import { AuthenContext } from './authContext'


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
