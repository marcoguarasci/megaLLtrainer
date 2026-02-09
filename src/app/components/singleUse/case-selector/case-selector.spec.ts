import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSelector } from './case-selector';

describe('CaseSelector', () => {
  let component: CaseSelector;
  let fixture: ComponentFixture<CaseSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
