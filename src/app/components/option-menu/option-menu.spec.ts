import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionMenu } from './option-menu';

describe('OptionMenu', () => {
  let component: OptionMenu;
  let fixture: ComponentFixture<OptionMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
