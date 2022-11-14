import {createContext} from "react";

export interface IAuthContext {
    token: string | null,
    userId: string | null;
    login: (jwtToken: string, id: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

