import { Component, EventEmitter, inject, input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { DataReader } from '../../../service/data-reader';

@Component({
  selector: 'app-case-shower',
  templateUrl: './case-shower.html',
  styleUrl: './case-shower.scss',
})
export class CaseShower implements OnInit , OnChanges{

  @Output("caseToggled") caseToggled = new EventEmitter<CaseLL>();

ngOnChanges(changes: SimpleChanges): void {
  
  this.imgPath.set(DataReader.getImgPath(this.ccase()));
}

  ngOnInit(): void {
    this.imgPath.set(DataReader.getImgPath(this.ccase()));
  }

  ccase = input.required<CaseLL>();
  
  imgPath = signal<string>("");

  toggleCase(): void {
    this.ccase().isSelected = !this.ccase().isSelected;
    this.caseToggled.emit(this.ccase());
  }
}
