import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateResponse } from '../models/responses/authenticateResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticatedUser: any = null;

  mockUsers: any = [
    {
      id: '001',
      username: 'al2',
      password: 'al2',
      details: {
        role: 'admin',
        accessUrls: ['all']
      }
    },
    {
      id: '002',
      username: 'al3',
      password: 'al3',
      details: {
        role: 'regular',
        accessUrls: ['coops', "transactions"]
      }
    },
  ]
  constructor(private router: Router) { }

  isAuthenticated(): boolean {
    const isAuthenticated = this.authenticatedUser || localStorage['user'];
    return isAuthenticated;
    
  }

  login(user: AuthenticateResponse) {
    localStorage['user'] = user.user_name;
    localStorage['token'] = user.access_token;
    this.setAuthenticatedUser(user);
    this.router.navigate(['/inicio']);
  }

  setAuthenticatedUser(user: any) {
    // const findUser = this.mockUsers.filter((user: any) => {
    //   return user.id === userId;
    // });
    this.authenticatedUser = {
      accessUrls: user.roles && user.roles.includes('ROLE_WEBAL2ADMIN') ? ['all'] : ['coops', 'transactions', 'socios'],
      username: localStorage['user']
    };
  }

  reAuthenticatedUser(isAdmin: boolean) {
    this.authenticatedUser = {
      accessUrls: isAdmin ? ['all'] : ['coops', 'transactions', 'socios'],
      username: localStorage['user']
    };
  }

  authenticateUser(username: string, password: string) {
    let errors: any = {}, isValidPassword;
    return new Promise((resolve, reject)=> {
      const findUser = this.mockUsers.filter((user: any) => {
        return user.username === username;
      });
      if (findUser.length) {
        if ((findUser[0].password === password)) {
          this.login(findUser[0].id);
          resolve(findUser[0])
        } else {
          errors['password'] = "Incorrect password";
          reject(errors)
        }
      } else {
        errors['username'] = "User not found";
        reject(errors)
      }
    })
  }

  logout() {
    this.authenticatedUser = null;
    delete localStorage['user'];
    this.router.navigate(['/login']);
  }
}
