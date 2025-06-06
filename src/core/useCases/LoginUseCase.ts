import { User } from "../domain/User";
import { AuthService } from "../ports/AuthService";

export class LoginUseCause{
    constructor(private authService: AuthService){}

    async execute(email: string, password: string): Promise<User | null>{
        return this.authService.login(email, password);
    }
}