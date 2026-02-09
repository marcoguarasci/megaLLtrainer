import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSetSelector } from './sub-set-selector';

describe('SubSetSelector', () => {
  let component: SubSetSelector;
  let fixture: ComponentFixture<SubSetSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubSetSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSetSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
