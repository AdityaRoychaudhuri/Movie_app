import React, { useContext, createContext, useEffect, useState } from "react";
import { account } from "../services/appwrite";
import { ID } from "react-native-appwrite";

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<void>;
    logout:() => Promise<void> ;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider ({ children } : { children: React.ReactNode }){
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      checkUser();
    }, [])
    
    async function checkUser() {
        try {
            const currUser = await account.get();
            setUser(currUser);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function login(email: string, password: string) {
        await account.createEmailPasswordSession(email, password);
        const currUser = await account.get();
        setUser(currUser);
    }

    async function register(email: string, password: string, name: string) {
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be indside AuthProvider");
    }

    return context;
}