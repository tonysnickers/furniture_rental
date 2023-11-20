import React, {createContext, useState} from 'react'

const AuthenContext = createContext()

export const AuthProvider = ({children}) => {
        const [isAuthentify, setIsAuthentify] = useState<Boolean>(false)

  return (
    <AuthenContext.Provider value={{isAuthentify, setIsAuthentify}}>
        {children}
    </AuthenContext.Provider>
  )
}

