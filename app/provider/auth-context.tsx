import { createContext, useContext, useState } from "react";
import type { User } from "~/types/index.ts";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading : boolean;
  login : (email: string , password: string) => Promise<void>
  logout : () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children: React.ReactNode}) => {

  const [user , setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async(email: string, password: string) => {
    console.log(email,password);
  }
  const logout = async() => {
    console.log("Logging out");
  }
  
  const values = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
}
