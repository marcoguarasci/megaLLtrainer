import { AfterViewInit, Component, EventEmitter, inject, Input, input, OnChanges, OnDestroy, OnInit, Output, QueryList, signal, SimpleChanges, ViewChildren } from '@angular/core';
import { SmallSetSelector } from '../small-set-selector/small-set-selector';
import { DataReader } from '../../../service/data-reader';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { SetLL } from '../../../../../public/utilites/SetLL.type';
import { SubsetLL } from '../../../../../public/utilites/SubsetLL';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-sub-set-selector',
  imports: [SmallSetSelector],
  templateUrl: './sub-set-selector.html',
  styleUrl: './sub-set-selector.scss',
})
export class SubSetSelector {

  OLLsPLLs = input.required<Array<SubsetLL>>();

  protected toggleSubset(toggledSubset: SubsetLL): void {
    toggledSubset.isSubsetSelected = !toggledSubset.isSubsetSelected;

    for (let setLL of toggledSubset.sets) {
      setLL.isSetSelected = toggledSubset.isSubsetSelected;
      for (let ccase of setLL.cases)
        ccase.isSelected = toggledSubset.isSubsetSelected;
    }
  }

  protected toggledSet(toggledSet: SetLL, subsetLL: SubsetLL) {

    if (toggledSet.isSetSelected) {
      if (!subsetLL.isSubsetSelected && !subsetLL.sets.some((setLL) => { return !setLL.isSetSelected }))
        subsetLL.isSubsetSelected = true;
    } else if (subsetLL.isSubsetSelected)
      subsetLL.isSubsetSelected = false;
  }
}
