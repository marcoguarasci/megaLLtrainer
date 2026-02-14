import { Component, signal, input, OnInit, ViewChild, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { SubSetSelector } from "../../multiUse/sub-set-selector/sub-set-selector";
import { CaseShower } from '../../multiUse/case-shower/case-shower';
import { DecimalPipe } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { UnselectableCaseShower } from "../../multiUse/unselectable-case-shower/unselectable-case-shower";
import { DataReader } from '../../../service/data-reader';

@Component({
  selector: 'app-trainer',
  imports: [DecimalPipe, CaseShower],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class Trainer implements OnInit, AfterViewInit {

  @ViewChild('focusHere') timerEl!: ElementRef;
  
  cases = input.required<Array<CaseLL>>();
  
  ngOnInit(): void {
    this.nextCase();
    this.setFocus();
  }
  
  ngAfterViewInit(): void {
    this.setFocus();
  }
  
  currentCase = signal<CaseLL>({ name: "", solutions: [""], scrambles: [""], isSelected: true });
  currentTime = signal<number>(0);
  
  readonly timerIncrease: number = 10;
  private isTimerGoing: boolean = false;
  private isTimerStarting: boolean = false;
  private interval: any = null;

  protected nextCase() {
    this.currentCase.set(this.cases()[Math.floor(Math.random() * this.cases().length)]);
    this.setFocus();
  }

  getImgPath(ccase: CaseLL): string {
    return DataReader.getImgPath(ccase);
  }

  private setFocus() {
    // setTimeout(() => {
    //   this.timerEl.nativeElement.focus();
    // }, 100);

    // console.log("ehi!", this.timerEl);
    // focusElement?.foc;

    // if (focusElement instanceof HTMLElement)
    //   focusElement.nativeElement.focus();
  }

  timerPressed(event: KeyboardEvent) {

    if (this.isTimerGoing) {
      this.isTimerGoing = false;
      clearInterval(this.interval);
      this.nextCase();
    }
    else {
      if (event.code == "Space") {

        this.isTimerStarting = true;
        this.currentTime.set(0);
      }
    }
  }

  timerReleased(event: KeyboardEvent) {

    if (event.code == "Space" && this.isTimerStarting) {
      this.isTimerStarting = false;
      this.isTimerGoing = true;
      this.interval = setInterval(() => {
        this.currentTime.update((value) => { return value += this.timerIncrease / 1000 })
        console.log(this.currentTime);
      }, this.timerIncrease);
    }
  }
}
