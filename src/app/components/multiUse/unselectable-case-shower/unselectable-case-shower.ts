import { Component, input } from '@angular/core';
import { CaseShower } from "../case-shower/case-shower";

@Component({
  selector: 'app-unselectable-case-shower',
  templateUrl: './unselectable-case-shower.html',
  styleUrl: './unselectable-case-shower.scss',
})
export class UnselectableCaseShower {

  isSelected = input<boolean>(false);
}
