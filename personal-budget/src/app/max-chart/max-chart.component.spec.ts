import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxChartComponent } from './max-chart.component';

describe('MaxChartComponent', () => {
  let component: MaxChartComponent;
  let fixture: ComponentFixture<MaxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
