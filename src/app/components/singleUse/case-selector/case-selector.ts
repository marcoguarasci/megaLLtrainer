import { Component, inject, OnInit, signal } from '@angular/core';
import { SubSetSelector } from "../../multiUse/sub-set-selector/sub-set-selector";
import { DataReader } from '../../../service/data-reader';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { SubsetLL } from '../../../../../public/utilites/SubsetLL';
import { SetLL } from '../../../../../public/utilites/SetLL.type';
import { Trainer } from "../trainer/trainer";

@Component({
  selector: 'app-case-selector',
  imports: [SubSetSelector, Trainer],
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

  OLLClicked() {
    this.isOLLSelected.set(true);
  };

  PLLClicked() {
    this.isOLLSelected.set(false);
  };

  toggleCase(toggledCase: CaseLL) {
    toggledCase.isSelected = !toggledCase.isSelected;
  };

  onClick() {
    this.trainingCases.set([]);

    let trainingGroup = this.isOLLSelected() ? this.OLLs() : this.PLLs();

    for (let subsetLL of trainingGroup)
      for (let setLL of subsetLL.sets)
        for (let ccase of setLL.cases)
          if (ccase.isSelected)
            this.trainingCases.update((value) => {
              value.push(ccase); return value
            })

    if (this.trainingCases().length > 0)
      this.isTraining.set(!this.isTraining());
    else
        alert("No cases selected!");
  }
}
