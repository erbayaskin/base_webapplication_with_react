import { createContext, useState } from "react";
import { loadAuthState, storeAuthState,removeAuthState } from "./storage";
import {setToken} from "../../libs/http" 

export const AuthContext = createContext();

export function AuthenticationContext({children}){
    const [auth,setAuth] = useState(loadAuthState());

    const onLoginSuccess = (data) => {
        setToken(data);
        setAuth(data);
        storeAuthState(data);
    }
    const onLogoutSuccess = () => {
        setToken(null);
        setAuth(null);
        removeAuthState();
    }

    return <AuthContext.Provider value={{
        ...auth,
        onLoginSuccess,
        onLogoutSuccess
    }}>
        {children}
    </AuthContext.Provider>
}
