import { Component, EventEmitter, input, Output } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { DataReader } from '../../../service/data-reader';

@Component({
  selector: 'app-case-shower',
  templateUrl: './case-shower.html',
  styleUrl: './case-shower.scss',
})
export class CaseShower {

  @Output("caseToggled") caseToggled = new EventEmitter<CaseLL>();

  ccase = input.required<CaseLL>();

  public removeCase(removedCase: CaseLL): void {
    if (removedCase.name == this.ccase().name) {
      this.ccase().isSelected = false;
      this.caseToggled.emit(this.ccase());
    }
  }

  toggleCase(): void {
    this.ccase().isSelected = !this.ccase().isSelected;
    this.caseToggled.emit(this.ccase());
  }

  imgPath(): string {
    return DataReader.getImgPath(this.ccase());
  }
}
