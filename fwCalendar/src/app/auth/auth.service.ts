import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from './user';
import {shareReplay, tap} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:42000/api/permissions/login';
  private helper = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(username: string, password: any) {
    return this.http.post<User>(this.loginUrl, {username, password})
      .pipe(
        tap(res => {
          this.setSession(res);
        }),
        shareReplay()
      );
  }

  private setSession(authResult) {
    const decodedJWT = this.helper.decodeToken(authResult);

    localStorage.setItem('jwt', authResult);
    localStorage.setItem('expires_at', JSON.stringify(decodedJWT.exp));
    localStorage.setItem('permissions', JSON.stringify(decodedJWT.permissions));
  }

  public getJWT(): string {
    return localStorage.getItem('jwt');
  }

  public isAuthenticated(): boolean {
    return this.getJWT() && !this.isTokenExpired();
  }

  isTokenExpired(): boolean {
    return this.helper.isTokenExpired(this.getJWT());
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
