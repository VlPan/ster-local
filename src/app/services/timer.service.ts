import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TimerService {

  staringTime;
  pauseTimeStart = 0;
  pauseTimeEnd = 0;
  pauseTime = 0;
  secs = 0;
  mins = 0;
  hours = 0;
  days = 0;
  timerRef;
  running = false;
  perc: BehaviorSubject<number> = new BehaviorSubject(612);
  mmin = 2;
  percm = this.perc.value;
  startText = 'Start';


  setStartTime() {
    this.staringTime = Date.now();
  }

  clearStartTime() {
    this.staringTime = null;
  }

  updateStartTime() {
    this.staringTime += this.pauseTime;
  }

  startTimer() {
    this.pauseTimeEnd = Date.now();
    if (this.pauseTimeStart) {
      this.pauseTime += this.pauseTimeEnd - this.pauseTimeStart;
      this.pauseTimeEnd = 0;
      this.pauseTimeStart = 0;
    }

    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      this.timerRef = setInterval(() => {
        this.secs += 1;
        this.updateTimerIfSleep();
        this.perc.next(this.perc.value - (this.percm / 60 / this.mmin));
      }, 1000);
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.resetTimer();
    this.running = false;
    clearInterval(this.timerRef);
    this.pauseTime = 0;
    this.perc.next(612);
    this.clearStartTime();
  }

  pauseTimer() {
    this.pauseTimeStart = Date.now();
    this.running = false;
    clearInterval(this.timerRef);
  }

  resetTimer() {
    this.secs = 0;
    this.mins = 0;
    this.hours = 0;
    this.setStartTime();
    this.pauseTime = 0;
    this.perc.next(612);
  }


  updateTimerIfSleep() {
    if (this.secs % 1 === 0) {
      const realPassedTime = Date.now() - this.staringTime - this.pauseTime;
      const realPassedTimeSecs = Math.floor(realPassedTime / 1000);

      const rdays = Math.floor(realPassedTimeSecs / 60 / 60 / 24);
      const rhours = Math.floor((realPassedTimeSecs - (rdays * 24 * 60 * 60)) / 60 / 60);
      const rmins = Math.floor((realPassedTimeSecs - (rhours * 60 * 60)) / 60 );
      const rsecs = Math.floor(realPassedTimeSecs - ((rmins * 60) + (rhours * 60 * 60)));

      this.secs = rsecs;
      this.mins = rmins;
      this.hours = rhours;
      this.days = rdays;

      if ((this.mins >= this.mmin)) {
        this.perc.next(612);
      }

    }
  }

}
