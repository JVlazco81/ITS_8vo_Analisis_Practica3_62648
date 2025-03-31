import { User } from "../../core/domain/User";
import { AuthService } from "../../core/ports/AuthService";

export class AuthServiceImpl implements AuthService {
    async login(email: string, password: string): Promise<User | null>{
        try{
            const response = await fetch('http://localhost:8383/api/auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
    
            if (!response.ok){
                return null;
            }
    
            const data = await response.json();
            const token = data.access_token;
    
            localStorage.setItem("token", token);
            return {
                id: "",
                name: "",
                email: email,
                token: token
            }
        }catch(error){
            console.error(error);
            return null;
        }
    }

    async logout(): Promise<void> {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token disponible");
    
        const response = await fetch("http://localhost:8383/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
    
        if (!response.ok) {
            throw new Error("Error al cerrar sesión");
        }
    
        localStorage.removeItem("token");
    }
    
    async register(name: string, email: string, password: string): Promise<User | null> {
        try {
            const response = await fetch("http://localhost:8383/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) return null;

            const data = await response.json();
            const userData = data.user;

            return {
                id: "",
                name: userData.name,
                email: userData.email,
                token: "",
            };
        } catch (error) {
            console.error("Error en registro:", error);
            return null;
        }
    }
}