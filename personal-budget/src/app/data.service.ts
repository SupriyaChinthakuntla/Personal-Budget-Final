import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserSchema } from './models/users';
import { Router } from '@angular/router';
import { BudgetSchema } from '../app/models/budget';
// import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DataService {

DataObservable: Observable<any>;
userData : Observable<UserSchema[]>

isUserLoggedIn = new Subject<boolean>();
timerId: any;
isOpenModel = new Subject<boolean>();
userRecord = {};

constructor(private http: HttpClient,public router: Router) {

  this.isOpenModel.next(false);

 }

// tslint:disable-next-line: typedef
getData(): Observable<any> {
  if (this.DataObservable) {
    return this.DataObservable;
  } else {
    const token = localStorage.getItem('jwt');
    const headers = {'content-type': 'application/json','Authorization' : `Bearer ${token}`};
    this.DataObservable = this.http.get('http://localhost:3000/budget').pipe(shareReplay());
    return this.DataObservable;
  }
}

postBudget(data:BudgetSchema){
  const headers = {'content-type': 'application/json'};
  const body=JSON.stringify(data);
  console.log(body)
  return this.http.post('http://localhost:3000/budget',body,{'headers':headers});
}


signUp(data:UserSchema) {
  const headers = {'content-type': 'application/json'};
  const body = JSON.stringify(data);
  return this.http.post('http://localhost:3000/user',body,{'headers':headers});
}


userLogin(data : UserSchema) {
  const headers = {'content-type': 'application/json'};
  const body = JSON.stringify(data);
  console.log(body)
  return this.http.post('http://localhost:3000/auth',body,{'headers':headers}).subscribe((res:any) => {
    console.log(res);
    this.userRecord['username'] = data.username;
    this.userRecord['password'] = data.password;
    console.log("user record is "+ JSON.stringify(this.userRecord));
    localStorage.setItem('accessToken',res.token);
        localStorage.setItem('refreshToken',res.refreshToken);
        localStorage.setItem('expiration',res.exp);
        this.isUserLoggedIn.next(true);
        this.router.navigate(['/homepage']);
        this.setTimer(true);
      },err => {
          this.invalidUser();
      })
  }

  public getLogInStatus(): Observable<boolean> {
    return this.isUserLoggedIn;
  }

  public setTimer(flag){
    console.log("Timer set");
    if (flag) {
      this.timerId = setInterval(() => {
        const expiration = localStorage.getItem('expiration');
        const expirationDate = new Date(0).setUTCSeconds(Number(expiration));
        const TokenNotExpired = expirationDate.valueOf() > new Date().valueOf();
        const lessThanTwentySecRemaining = expirationDate.valueOf() - new Date().valueOf() <= 20000;
        console.log(lessThanTwentySecRemaining);
        if (TokenNotExpired && lessThanTwentySecRemaining) {
          let message = confirm(
            'Your session is going to expire in 20 seconds! click OK to extend the session!'
          );
          if(message){
            let record = {};
            record['username'] = this.userRecord['username']
            record['password'] = this.userRecord['password'];
            console.log(JSON.stringify(record));
            this.userLogin(record);
          }else{
            message = false;
          }
        }
        if (new Date().valueOf() >= expirationDate.valueOf()){
          clearInterval(this.timerId);
          this.logout();
          console.log('clear interval');
  }
      }, 20000);
    } else {
      clearInterval(this.timerId);
    }
  }


  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  verifyTokenPresence(){
    return !!localStorage.getItem('token');
  }

  invalidUser(){
    console.log("Invalid User");
    // this.toast.error("User does not exist. Please proceed to signup page",'Error');
   }


}
