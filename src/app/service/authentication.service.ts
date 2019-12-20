import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Model/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public cureentUser: Observable<User>;
  
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.cureentUser = this.currentUserSubject.asObservable();
  }

  public get CurrentUserValue(): User {
    return this.currentUserSubject.value;
  }
  /**
   * send post request to api
   * @param email 
   * @param password 
   */
  login(email: string, password: string) {
    
    return this.http.post<any>(`${environment.apiUrl}/api/login`, { email, password })
      .pipe(map(user => {
        /** store user details and basic auth credentials in localstorage  */
        user.authdata = window.btoa(email + ':' + password);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  
    /**
     *  remove user details from localstorage when logout() call
     * @author khushbu shah
     */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
