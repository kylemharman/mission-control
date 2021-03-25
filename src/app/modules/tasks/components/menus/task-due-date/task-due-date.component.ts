import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import * as moment from 'moment';

@Component({
  selector: 'mc-task-due-date',
  templateUrl: './task-due-date.component.html',
  styleUrls: ['./task-due-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDueDateComponent {
  date = moment();

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() {}

  selectedDate(date: moment.Moment): void {
    // const dateAndTime = date.add(26, 'hours').add(55, 'minutes');
    this.date = date;
  }
  selectedTime(hours: number, minutes: number): void {}

  closeMenu(): void {
    this.trigger.closeMenu();
  }
}
