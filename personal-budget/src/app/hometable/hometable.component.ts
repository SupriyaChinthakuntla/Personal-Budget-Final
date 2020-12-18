import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { AngularFirestore, AngularFirestoreDocument,AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface BudgetSchema {
  id: string;
  budget: number;
  maxbudget: number;
  color: string;
}


@Component({
  selector: 'pb-hometable',
  templateUrl: './hometable.component.html',
  styleUrls: ['./hometable.component.scss']
})

export class HometableComponent implements OnInit {

  budgetCollection : AngularFirestoreCollection<BudgetSchema>;
  budgetData: Observable<BudgetSchema[]>;

  data = []

  public loggedUserName:any


  constructor(private dataService: DataService) {
    this.loggedUserName = this.dataService.loggedUserName;
   }

  ngOnInit(): void {

    this.dataService.getData(this.loggedUserName)
    .subscribe((res:any)=>{
      this.data = res
    })
  }

}
