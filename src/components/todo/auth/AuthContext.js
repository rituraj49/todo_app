import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({children}){

    const [isAuthenticated, setAuthenticated] = useState(false);
    const[username, setUsername] = useState(null);

    function login(username, password){
        if(username==="Terran" && password==="hello"){
            setAuthenticated(true);
            setUsername(username)
            return true;
        } else {
            logout();
            return false;
        }
    }

    function logout(){
        setAuthenticated(false);
        // setUsername(null);
    }

    return(
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username } }>
            {children}
        </AuthContext.Provider>
    )
}