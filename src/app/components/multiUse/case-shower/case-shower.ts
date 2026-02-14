import { Component, EventEmitter, inject, input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
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

  toggleCase(): void {
    this.ccase().isSelected = !this.ccase().isSelected;
    this.caseToggled.emit(this.ccase());
  }

  imgPath(): string {
    return DataReader.getImgPath(this.ccase());
  }
}
