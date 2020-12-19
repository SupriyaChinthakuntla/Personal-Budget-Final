import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HometableComponent } from './hometable.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('HometableComponent', () => {
  let component: HometableComponent;
  let fixture: ComponentFixture<HometableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppRoutingModule
      ],
      declarations: [ HometableComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HometableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
