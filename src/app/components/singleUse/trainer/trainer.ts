import { Component, signal, input, OnInit, ViewChild, ElementRef, EventEmitter, viewChild, AfterViewInit, computed, Signal, Output, OnDestroy } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { SubSetSelector } from "../../multiUse/sub-set-selector/sub-set-selector";
import { CaseShower } from '../../multiUse/case-shower/case-shower';
import { DecimalPipe } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { UnselectableCaseShower } from "../../multiUse/unselectable-case-shower/unselectable-case-shower";
import { DataReader } from '../../../service/data-reader';
import { SetLL } from '../../../../../public/utilites/SetLL.type';

@Component({
  selector: 'app-trainer',
  imports: [DecimalPipe, CaseShower],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class Trainer implements OnInit {

  @Output("removeCase") removeCase = new EventEmitter<CaseLL>();
  @Output("trainingEnded") trainingEnded = new EventEmitter<void>();

  @ViewChild('focusHere') timerEl!: ElementRef;

  cases = input.required<Array<CaseLL>>();

  ngOnInit(): void {
    this.nextCase();
    this.setFocus();
  }

  private nullCase: CaseLL = { name: "", solutions: [""], scrambles: [""], isSelected: true };

  currentCase = signal<CaseLL>(this.nullCase);
  lastCase = signal<CaseLL>(this.nullCase);
  currentTime = signal<number>(0);
  isTimerStarting = signal<boolean>(false);

  onlyNames: string = "onlyNames";
  onlyImgs: string = "onlyImgs";
  protected bothImgsNames: string = "bothImgsNames";
  noneImgsNames: string = "noneImgsNames";
  showRemainingCases = signal<string>(this.onlyNames);

  onSelectShowRemainingCases(e: Event): void {
    this.showRemainingCases.set((e.target as HTMLSelectElement).value);
  }

  readonly timerIncrease: number = 10;
  private isTimerGoing: boolean = false;
  private interval: any = null;

  /**
  * @param doSetLastCase if false, it will not set the last case
  */
  protected nextCase(doSetLastCase: boolean = true): void {
    if (doSetLastCase)
      if (this.currentCase().name.length > 0)
        this.lastCase.set(this.currentCase());
    this.currentCase.set(this.cases()[Math.floor(Math.random() * this.cases().length)]);
    this.setFocus();
  }

  protected removeLastCase(): void {
    this.removeCase.emit(this.lastCase());
    this.lastCase.set(this.nullCase);
    this.setFocus();

    if (this.cases().length == 0) {
      alert("No more cases!");
      this.trainingEnded.emit();
    }

    this.nextCase(false);
  }
  
  getImgPath(ccase: CaseLL | undefined): string {
    return DataReader.getImgPath(ccase);
  }

  // to set the focus on the timer
  private setFocus(): void {
    setTimeout(() => {
      this.timerEl.nativeElement.focus();
    }, 10);
  }

  // Timer 1
  timerPressed(event: KeyboardEvent): void {

    if (this.isTimerGoing) {
      this.isTimerGoing = false;
      clearInterval(this.interval);
      this.nextCase();
    }
    else {
      if (event.code == "Space") {

        this.isTimerStarting.set(true);
        this.currentTime.set(0);
      }
    }
  }

  // Timer 2
  timerReleased(event: KeyboardEvent): void {

    if (event.code == "Space" && this.isTimerStarting()) {
      this.isTimerStarting.set(false);
      this.isTimerGoing = true;
      this.interval = setInterval(() => {
        this.currentTime.update((value) => { return value += this.timerIncrease / 1000 })
        console.log(this.currentTime);
      }, this.timerIncrease);
    }
  }
}
