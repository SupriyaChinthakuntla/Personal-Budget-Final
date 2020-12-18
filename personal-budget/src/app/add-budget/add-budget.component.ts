import { Component, NgZone, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-add-budget',
  templateUrl: './add-budget.component.html',
  styleUrls: ['./add-budget.component.scss']
})
export class AddBudgetComponent implements OnInit {

  title : string;
  budget : number;
  maxbudget : number;

  constructor(private dataService:DataService, private router:Router, private ngZone:NgZone) { }

  ngOnInit(): void {
  }

  randomColorGenerator(){
    let randomColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
    console.log(randomColor)
    return randomColor;
  }

  sendExpense(){
    let expenseRecord = {};

    expenseRecord['budget'] = this.budget;
    expenseRecord['maxbudget'] = this.maxbudget;
    expenseRecord['title'] = this.title.charAt(0).toUpperCase()+this.title.slice(1);
    expenseRecord['color'] = this.randomColorGenerator();
    expenseRecord['username'] = this.dataService.loggedUserName;

    if(!this.budget || !this.maxbudget || !this.title){
      // this.incompleteDetails();
      return;
    }
    else{
    this.dataService.postBudget(expenseRecord)
      .subscribe(data =>{
        console.log(data);
        this.budget = null;
        this.maxbudget = null;
        this.title = "";
        // this.expenseAddToast();
        this.ngZone.run(() => {
          console.log("Running ngZone")
          this.dataService.getData(this.dataService.loggedUserName)
          .subscribe((res: any) => {
            this.router.navigate(['/homepage']);
          });
        });
      },
      err => {
        console.log("Title exists!");
        // this.duplicateExpenseTitle();
        this.title = "";
      })
  }
}

}
