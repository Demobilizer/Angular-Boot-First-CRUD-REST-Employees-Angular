import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router: Router,) { }

  validateUser(user : User) {
    return this.http.post("http://localhost:8080/login", user, {responseType: "text"});
    
  }


  authenticateUser(user : User) {
    console.log("coming here with username: "+user.username+" and pwd: "+user.password);
    //return this.http.post("http://localhost:8081/authenticate", user, {responseType: "text"});
    return this.http.post<any>('http://localhost:8080/authenticate',user).pipe(
       map(
         userData => {
          sessionStorage.setItem('username',user.username);
          //console.log(userData);
          let tokenStr= 'Bearer '+userData.jwtToken;
          console.log("token str---"+tokenStr);
          sessionStorage.setItem('token', tokenStr);
          return userData;
         }
       )
  
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('userName');
    console.log(!(user === null));
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('token');
    this.router.navigate([``]);
   }

}
