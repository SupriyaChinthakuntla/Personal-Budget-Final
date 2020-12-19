import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {Toast, ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AuthguardGuard} from './authguard.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ContactComponent } from './contact/contact.component';
import { PieComponent } from './pie/pie.component';
import { DataService } from './data.service';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { AddBudgetComponent } from './add-budget/add-budget.component';
import { HometableComponent } from './hometable/hometable.component';
import { DualbarComponent } from './dualbar/dualbar.component';
import { ChartsModule } from 'ng2-charts';
import { MaxChartComponent } from './max-chart/max-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeroComponent,
    FooterComponent,
    HomepageComponent,
    ArticleComponent,
    AboutComponent,
    LoginComponent,
    P404Component,
    BreadcrumbsComponent,
    ContactComponent,
    PieComponent,
    SignupComponent,
    BarChartComponent,
    LineChartComponent,
    AddBudgetComponent,
    HometableComponent,
    DualbarComponent,
    MaxChartComponent
  ],
  imports: [
    BrowserModule,
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    // BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [
    DataService, AuthguardGuard, HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
