import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseShower } from './case-shower';

describe('CaseShower', () => {
  let component: CaseShower;
  let fixture: ComponentFixture<CaseShower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseShower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseShower);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
