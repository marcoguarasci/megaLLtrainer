import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnselectableCaseShower } from './unselectable-case-shower';

describe('UnselectableCaseShower', () => {
  let component: UnselectableCaseShower;
  let fixture: ComponentFixture<UnselectableCaseShower>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnselectableCaseShower]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnselectableCaseShower);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
