import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
// import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Constants } from '../app.global';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public userData = [];
  username : string
  password : string
  isUserLoggedIn = new Subject<boolean>();

  constructor(private router : Router, public dataService : DataService) {
    this.isUserLoggedIn.next(false);
   }

  ngOnInit(): void {

  }

  login() {
    let loginRecord = {};
    loginRecord['username'] = this.username;
    loginRecord['password'] = this.password;
    console.log(JSON.stringify(loginRecord));

    if(!this.username || !this.password) {
      this.enterAllDetails();
      console.log("UserName or password is missing");
    } else {
      this.dataService.userLogin(loginRecord);
    }
  }

  signUp() {
    this.router.navigate(['/signup'])
  }

  enterAllDetails() {
    // this.toast.error('Please enter all the required fields','Warning',{  positionClass: 'md-toast-top-left' });
    console.log("in");
  }

  loginSuccessful(){
    // this.toast.success('Logged in successfully','Success');
  }

  loginFailure(){
    // this.toast.error('Please Enter Valid Credentials!','Failure');
  }

}
