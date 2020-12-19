import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
    ]
    });
        service = TestBed.inject(DataService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });
});
