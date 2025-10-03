import { Injectable } from '@angular/core';
import { User } from '../types/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  defaultUsers: User[] = [
    { email: 'admin@example.com', password: 'admin1234' },
    { email: 'user@example.com', password: 'user1234' },
  ];

  constructor() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.defaultUsers));
    }
  }

  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users')!);
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
  }

  getLoggedUser(): User | null {
    return JSON.parse(localStorage.getItem('loggedUser') || 'null');
  }

  register(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users')!);
    if (users.some((u) => u.email === email)) {
      return false;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
}
