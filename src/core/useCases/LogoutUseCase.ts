import { AuthService } from "../ports/AuthService";

export class LogoutUseCase {
  constructor(private authService: AuthService) {}

  async execute(): Promise<void> {
    return this.authService.logout();
  }
}