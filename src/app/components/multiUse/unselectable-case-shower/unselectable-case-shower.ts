import { Component, input } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { DataReader } from '../../../service/data-reader';

@Component({
  selector: 'app-unselectable-case-shower',
  templateUrl: './unselectable-case-shower.html',
  styleUrl: './unselectable-case-shower.scss'
})
export class UnselectableCaseShower {

  cases = input.required<Array<CaseLL>>();

  protected getImgPath(ccase: CaseLL): string {
    return DataReader.getImgPath(ccase);
  }
}
