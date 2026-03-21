import { Component, input, signal } from '@angular/core';
import { SmallSetSelector } from '../small-set-selector/small-set-selector';
import { SetLL } from '../../../../../public/utilites/SetLL.type';
import { SubsetLL } from '../../../../../public/utilites/SubsetLL';

@Component({
  selector: 'app-sub-set-selector',
  imports: [SmallSetSelector],
  templateUrl: './sub-set-selector.html',
  styleUrl: './sub-set-selector.scss',
})
export class SubSetSelector {

  public subsetLL = input.required<SubsetLL>();

  protected showCases = signal<boolean>(true);

  protected toggleShowSets(): void {
    this.showCases.update((value) => { return !value });
  }

  protected togglethisSubset(): void {
    this.subsetLL().isSubsetSelected = !this.subsetLL().isSubsetSelected;

    for (let setLL of this.subsetLL().sets) {
      setLL.isSetSelected = this.subsetLL().isSubsetSelected;
      for (let ccase of setLL.cases)
        ccase.isSelected = this.subsetLL().isSubsetSelected;
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
