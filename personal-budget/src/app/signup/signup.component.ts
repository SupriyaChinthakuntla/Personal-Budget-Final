import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username : string;
  password : string;
  repassword : string;
  email : string

  public userData = [];


  constructor(private http:HttpClient, private router:Router, public dataService: DataService) {

   }



  ngOnInit(): void {
  }




  duplicateUserName() {
    // this.toast.warning('User already exists! Please go to login page!');
  }

  incompleteDetails() {
    // this.toast.error('Please enter all the required fields','Warning');
  }


  login() {
    let record = {};
    record['username'] = this.username;
    record['password'] = this.password;
    record['email'] = this.email;
    record['repassword'] = this.repassword;
    console.log(this.userData);
    for(let i = 0; i < this.userData.length; i++){
      if(this.userData[i].username == this.username){
        console.log("There exists a user with same username");
        // this.toast.warning('User already exists! Please go to login page!');

        return;
      }
    }

    this.registration();
  }

  registration() {
    let signUpRecord = {};
    signUpRecord['username'] = this.username;
    signUpRecord['password'] = this.password;
    signUpRecord['email'] = this.email;
    signUpRecord['repassword'] = this.repassword;
    console.log(JSON.stringify(signUpRecord));
      if(!this.username || !this.password || !this.email || !this.repassword){
        // this.toast.error('Please enter all the required fields','Warning');
        this.incompleteDetails();
        return;
      } else {
        console.log("In else")
      this.dataService.signUp(signUpRecord)
        .subscribe(res => {
          this.username = "";
          this.password = "";
          this.email = "";
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err)
          console.log("Validation failed");
          this.router.navigate(['/login']);
        })
    }
  }
}
