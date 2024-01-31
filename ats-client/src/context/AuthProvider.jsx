import { createContext,useState } from "react";

 const authContext = createContext()  // 1. Create a context

export const AuthProvider = ({children}) => { // 2. Create a provider
  const [user,_setUser] = useState(localStorage.getItem('user'));
  const [token,_setToken] = useState(localStorage.getItem('token'));

  const setUser = (user) => {
    localStorage.setItem('user',JSON.stringify(user))
    _setUser(user)
  }

  const setToken = (token) => {
    localStorage.setItem('token',token)
    _setToken(token)
  }


  return (
    <authContext.Provider value={{user,token,setToken,setUser}}>
      {children}
    </authContext.Provider>
  )
}

export default authContext;