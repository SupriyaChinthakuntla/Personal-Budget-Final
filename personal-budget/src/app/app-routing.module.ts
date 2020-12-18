import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { ContactComponent } from './contact/contact.component';
import { SignupComponent } from './signup/signup.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { DualbarComponent } from './dualbar/dualbar.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'contact',
    component: ContactComponent
  },

  {
    path: 'homepage',
    component: HomepageComponent
  },

  {
    path: 'signup',
    component: SignupComponent,
    pathMatch : 'full'
  },

  {
    path:'logout',
    component: LoginComponent
  },


  {
    path: 'addbudget',
    component: AddBudgetComponent
  },
  {
    path: '**',
    component: P404Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
