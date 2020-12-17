import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { UserSchema } from './models/users';
import { BudgetSchema } from '../app/models/budget';

@Injectable({
  providedIn: 'root'
})
export class DataService {

DataObservable: Observable<any>;

constructor(private http: HttpClient) { }

// tslint:disable-next-line: typedef
getData(): Observable<any> {
  if (this.DataObservable) {
    return this.DataObservable;
  } else {
    this.DataObservable = this.http.get('http://localhost:3000/budget').pipe(shareReplay());
    return this.DataObservable;
  }
}

addBudgetdata(data:BudgetSchema){
  const headers = {'content-type': 'application/json'};
  const body=JSON.stringify(data);
  console.log(body)
  return this.http.post('http://localhost:3000/budget',body,{'headers':headers});
}


userSignUp(data:UserSchema){
  const headers = {'content-type': 'application/json'};
  const body=JSON.stringify(data);
  return this.http.post('http://localhost:3000/users',body,{'headers':headers});
}

}
