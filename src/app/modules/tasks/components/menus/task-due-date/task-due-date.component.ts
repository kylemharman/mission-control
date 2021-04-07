import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import * as moment from 'moment';
import { ITask } from 'src/app/core/models/task';
import { WithRef } from 'src/app/shared/helpers/firebase';

@Component({
  selector: 'mc-task-due-date',
  templateUrl: './task-due-date.component.html',
  styleUrls: ['./task-due-date.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDueDateComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input() task: WithRef<ITask>;
  @Output() dueDate = new EventEmitter<moment.Moment>();

  date: moment.Moment | undefined;
  time: string | undefined;

  closeMenu(): void {
    const dueDate = this._createDueDate();
    if (dueDate) this.dueDate.emit(dueDate);

    this.trigger.closeMenu();
  }

  selectedDate(date: moment.Moment): void {
    this.date = date;
  }

  selectedTime(time: string): void {
    this.time = time;
  }

  private _createDueDate(): moment.Moment {
    if (!this.date) return;

    const time = moment(this.time, 'h:mm a');
    const hour = time.hours();
    const min = time.minutes();
    const date = this.date.clone().startOf('day');
    return date.add(hour, 'hours').add(min, 'minutes');
  }
}
