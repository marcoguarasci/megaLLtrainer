import { Component, signal, input, OnInit, ViewChild, ElementRef, EventEmitter, Output, output, computed, Signal } from '@angular/core';
import { CaseLL } from '../../../../../public/utilites/CaseLL.type';
import { DecimalPipe } from '@angular/common';
import { DataReader } from '../../../service/data-reader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainer',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './trainer.html',
  styleUrl: './trainer.scss',
})
export class Trainer implements OnInit {

  trainingEnded = output<void>();
  removeCase = output<CaseLL>();
  reinstateCase = output<CaseLL>();

  @ViewChild('focusHere') timerEl!: ElementRef;

  cases = input.required<Array<CaseLL>>();

  ngOnInit(): void {
    this.nextCase();
    this.setFocus();
  }

  private nullCase: CaseLL = { name: "", solutions: [""], scrambles: [""], isSelected: true };
  private preAUF: Array<string> = ["", "U ", "U' ", "U2 ", "U2' "];
  private postAUF: Array<string> = ["", " U", " U'", " U2", " U2'"];

  protected currentCase = signal<CaseLL>(this.nullCase);
  protected lastCase = signal<CaseLL>(this.nullCase);
  protected isLastCaseRemoved = signal<boolean>(false);

  protected isTimerStarting = signal<boolean>(false);
  protected currentTime = signal<number>(0);
  protected currentTimeSplit = signal<number>(0);

  protected onlyNames: string = "onlyNames";
  protected onlyImgs: string = "onlyImgs";
  protected bothImgsNames: string = "bothImgsNames";
  protected noneImgsNames: string = "noneImgsNames";
  protected showRemainingCases = signal<string>(this.onlyNames);

  readonly timerIncrease: number = 10;
  private isTimerGoing: boolean = false;
  private isTimeSplitDone: boolean = false;
  private interval: any = null;

  protected isRemovingFastCases = signal<boolean>(false);
  protected fastCaseTime = signal<number>(1);
  protected isTimerSplitOn = signal<boolean>(false);
  protected showSolution = signal<boolean>(true);


  protected currentScramble: Signal<string> = computed(() => {
    return this.preAUF[Math.floor(Math.random() * this.preAUF.length)]
      + this.currentCase().scrambles[0] +
      this.postAUF[Math.floor(Math.random() * this.postAUF.length)];
  });


  getImgPath(ccase: CaseLL | undefined): string {
    return DataReader.getImgPath(ccase);
  }

  onSelectShowRemainingCases(e: Event): void {
    this.showRemainingCases.set((e.target as HTMLSelectElement).value);
  }

  /**
  * @param doSetLastCase if false, it will not set the last case
  */
  protected nextCase(doSetLastCase: boolean = true): void {
    if (doSetLastCase)
      if (this.currentCase().name.length > 0) {
        this.lastCase.set(this.currentCase());
        this.isLastCaseRemoved.set(false);
      }
    this.currentCase.set(this.cases()[Math.floor(Math.random() * this.cases().length)]);
    this.setFocus();
  }

  protected removeLastCase(): void {
    this.setFocus();

    if (!this.isLastCaseRemoved()) {
      this.removeCase.emit(this.lastCase());

      this.isLastCaseRemoved.set(true);

      if (this.cases().length == 0) {
        alert("No more cases!");
        this.trainingEnded.emit();
      }

      this.nextCase(false);
    }
    else {
      alert("Already removed");
    }

  }

  protected reSelectLastCase(): void {
    this.reinstateCase.emit(this.lastCase());
    this.isLastCaseRemoved.set(false);
  }


  // to set the focus on the timer
  protected setFocus(): void {
    setTimeout(() => {
      this.timerEl.nativeElement.focus();
    }, 10);
  }

  // Timer 1
  timerPressed(event: KeyboardEvent): void {

    if (this.isTimerGoing) { // stop timer

      if (this.isTimerSplitOn() && !this.isTimeSplitDone) {
        this.isTimeSplitDone = true;
        console.log("split");

      }
      else {
        this.isTimerGoing = false;
        this.nextCase();

        if (this.isRemovingFastCases())
          if (this.currentTime() < this.fastCaseTime())
            this.removeLastCase();

        clearInterval(this.interval);
      }
    }
    else {
      if (event.code == "Space") { // starting timer

        this.isTimerStarting.set(true);
        this.currentTime.set(0);
        this.isTimeSplitDone = false;
        this.currentTimeSplit.set(0);
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
        if (this.isTimerSplitOn() && !this.isTimeSplitDone)
          this.currentTimeSplit.set(this.currentTime());
      }, this.timerIncrease);
    }
  }
}
