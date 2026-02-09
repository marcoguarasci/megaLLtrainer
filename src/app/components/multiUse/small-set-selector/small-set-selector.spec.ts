import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSetSelector } from './small-set-selector';

describe('SmallSetSelector', () => {
  let component: SmallSetSelector;
  let fixture: ComponentFixture<SmallSetSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallSetSelector]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallSetSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
