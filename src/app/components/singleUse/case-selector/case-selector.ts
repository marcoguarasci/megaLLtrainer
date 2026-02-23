import { Component, computed, OnInit, Signal, signal } from '@angular/core';
import { SubSetSelector } from "../../multiUse/sub-set-selector/sub-set-selector";
import { DataReader } from '../../../service/data-reader';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { SubsetLL } from '../../../../../public/utilites/SubsetLL';
import { Trainer } from "../trainer/trainer";
import { TypeSelector } from "../../multiUse/type-selector/type-selector";

@Component({
  selector: 'app-case-selector',
  imports: [SubSetSelector, Trainer, TypeSelector],
  templateUrl: './case-selector.html',
  styleUrl: './case-selector.scss',
})
export class CaseSelector implements OnInit {

  constructor(private dataReader: DataReader) { }

  ngOnInit(): void {

    this.dataReader.getJSON().subscribe((data) => {

      this.OLLs.set(data.OLLs);
      this.PLLs.set(data.PLLs);

      let allData: Array<SubsetLL> = this.OLLs();
      allData.concat(this.PLLs());

      for (let OPLL of allData) {
        OPLL.isSubsetSelected = false;

        for (let set of OPLL.sets) {
          set.isSetSelected = false;

          for (let ccase of set.cases)
            ccase.isSelected = false;
        }
      }
    });
  };

  isOLLSelected = signal<boolean>(true);
  OLLs = signal<Array<SubsetLL>>([]);
  PLLs = signal<Array<SubsetLL>>([]);

  isTraining = signal<boolean>(false);
  trainingCases = signal<Array<CaseLL>>([]);
  trainBottonText: Signal<string> = computed(() => {
    if (this.isTraining())
      return "End training";
    return "Train";
  });;

  protected removeCase(removedCase: CaseLL): void {

    for (let i = 0; i < this.trainingCases().length; i++) {
      if (this.trainingCases()[i].name == removedCase.name) {
        this.trainingCases.update((value) => {
          value.splice(i, 1);
          return value;
        });

        removedCase.isSelected = false;

        break;
      }
    }

    // Check selection of sets and subsets    
    let isChecking: boolean = true;

    for (let subsetLL of this.isOLLSelected() ? this.OLLs() : this.PLLs()) {

      if (isChecking) {

        for (let setLL of subsetLL.sets)
          if (setLL.isSetSelected && setLL.cases.includes(removedCase)) {
            setLL.isSetSelected = false;
            isChecking = false;
            break;
          }

        if (!isChecking) {
          subsetLL.isSubsetSelected = false;
          break;
        }
      }
      else
        break;
    }
  }

  OLLClicked(): void {
    this.isOLLSelected.set(true);
  };

  PLLClicked(): void {
    this.isOLLSelected.set(false);
  };

  onTrainClick(): void {
    this.trainingCases.set([]);

    for (let subsetLL of this.isOLLSelected() ? this.OLLs() : this.PLLs())
      for (let setLL of subsetLL.sets)
        for (let ccase of setLL.cases)
          if (ccase.isSelected)
            this.trainingCases.update((value) => {
              value.push(ccase);
              return value
            })

    if (this.trainingCases().length > 0)
      this.isTraining.set(!this.isTraining());
    else
      alert("No cases selected!");
  }

  endTraining(): void {
    this.isTraining.set(false);
  }
}
