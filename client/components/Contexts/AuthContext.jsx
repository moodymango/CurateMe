import React, { useState, useEffect, useContext } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider(children) {
  const [authUser, setAuthUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const value = {
    AuthContext,
    authUser,
    setAuthUser,
    isLogged,
    setIsLogged,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
