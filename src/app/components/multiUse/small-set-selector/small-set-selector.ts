import { Component, EventEmitter, input, OnInit, output, Output, QueryList, signal, ViewChildren } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { CaseShower } from "../case-shower/case-shower";
import { CaseSelector } from '../../singleUse/case-selector/case-selector';
import { SetLL } from '../../../../../public/utilites/SetLL.type';
import { UnselectableCaseShower } from '../unselectable-case-shower/unselectable-case-shower';

@Component({
  selector: 'app-small-set-selector',
  imports: [CaseShower],
  templateUrl: './small-set-selector.html',
  styleUrl: './small-set-selector.scss',
})

export class SmallSetSelector {

  @Output("setToggled") setToggled = new EventEmitter<SetLL>();

  setLL = input.required<SetLL>();


  protected caseToggled(toggledCase: CaseLL): void {
    if (toggledCase.isSelected) {
      if (!this.setLL().isSetSelected && !this.setLL().cases.some((ccase) => { return !ccase.isSelected }))
        this.selectSet();
    }
    else if (this.setLL().isSetSelected)
      this.unselectSet();
  }

  protected toggleSet(): void {
    this.setLL().isSetSelected = !this.setLL().isSetSelected;
    this.setToggled.emit(this.setLL());

    for (let ccase of this.setLL().cases)
      ccase.isSelected = this.setLL().isSetSelected;
  }

  private unselectSet(): void {
    this.setLL().isSetSelected = false;
    this.setToggled.emit(this.setLL());
  }

  private selectSet(): void {
    this.setLL().isSetSelected = true;
    this.setToggled.emit(this.setLL());
  }
}
