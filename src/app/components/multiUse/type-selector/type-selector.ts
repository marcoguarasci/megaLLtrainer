import { Component, input, signal } from '@angular/core';
import { SmallSetSelector } from '../small-set-selector/small-set-selector';
import { SetLL } from '../../../../../public/utilites/SetLL.type';
import { SubsetLL } from '../../../../../public/utilites/SubsetLL';
import { SubSetSelector } from '../sub-set-selector/sub-set-selector';

@Component({
  selector: 'app-type-selector',
  imports: [SubSetSelector],
  templateUrl: './type-selector.html',
  styleUrl: './type-selector.scss',
})
export class TypeSelector {

  public OLLsPLLs = input.required<Array<SubsetLL>>();

  protected showCases = signal<boolean>(false);

  protected toggleShowSets(): void {
    this.showCases.update((value) => { return !value });
  }

  // protected toggleSubset(toggledSubset: SubsetLL): void {
  //   toggledSubset.isSubsetSelected = !toggledSubset.isSubsetSelected;

  //   for (let setLL of toggledSubset.sets) {
  //     setLL.isSetSelected = toggledSubset.isSubsetSelected;
  //     for (let ccase of setLL.cases)
  //       ccase.isSelected = toggledSubset.isSubsetSelected;
  //   }
  // }

  // protected toggledSet(toggledSet: SetLL, subsetLL: SubsetLL) {

  //   if (toggledSet.isSetSelected) {
  //     if (!subsetLL.isSubsetSelected && !subsetLL.sets.some((setLL) => { return !setLL.isSetSelected }))
  //       subsetLL.isSubsetSelected = true;
  //   } else if (subsetLL.isSubsetSelected)
  //     subsetLL.isSubsetSelected = false;
  // }
}
