import { TestBed } from '@angular/core/testing';

import { DataReader } from './data-reader';

describe('DataReader', () => {
  let service: DataReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataReader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
