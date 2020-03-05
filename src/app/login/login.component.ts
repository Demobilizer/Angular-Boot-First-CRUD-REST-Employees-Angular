import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: UserService, private router: Router) { }

  user : User = new User("","");
  errMsg : any;
  jwtToken : any;

  ngOnInit() {
  }

  validateEmployee() {
    // console.log(this.user);
    this.loginService.validateUser(this.user).subscribe((data)=>{
      //console.log("success data"+data);
      if(data === 'chal gaya!!') {
        sessionStorage.setItem('userName', this.user.username);
        console.log("valid user!");
        this.router.navigate([`./view`]);
      }
      else {
        this.errMsg = "Please enter valid username or password!!";
        console.log("not a valid user!");
      }
      
    },(err)=>{
      debugger;
      console.log(JSON.stringify(err));
    });
    
  }

  authenticateUser() {

    this.loginService.authenticateUser(this.user).subscribe((data)=>{
      //console.log("success data"+data);
      /* if(data === 'chal gaya!!') {
        sessionStorage.setItem('userName', this.user.userName);
        console.log("valid user!");
        this.router.navigate([`./view`]);
      }
      else {
        this.errMsg = "Please enter valid username or password!!";
        console.log("not a valid user!");
      } */
      
        this.jwtToken = data;
      
        sessionStorage.setItem('userName', this.user.username);
        console.log("token ----- "+this.jwtToken);
        console.log("valid user!");
        this.router.navigate([`./view`]);
      
      
    },(err)=>{
      //debugger;
      this.errMsg = "Please enter valid username or password!!";
        console.log("not a valid user!");
      console.log(JSON.stringify(err));
    });

  }

}
