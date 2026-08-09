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
  
}
