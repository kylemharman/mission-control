import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';
import { ITask } from 'src/app/core/models/task';
import { toMoment } from '../../helpers/time';
import { IQuickDate, quickDate } from './date-selector';

@Component({
  selector: 'mc-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit {
  @ViewChild(MatCalendar) calendar: MatCalendar<moment.Moment>;
  @Input() task: ITask;
  @Output() emitDate = new EventEmitter<moment.Moment>();
  date: moment.Moment | undefined;
  quickDates: IQuickDate[] = quickDate;

  ngOnInit(): void {
    this.date = this._getDateFromTaskDueDate();
  }

  quickDateClicked(moment: moment.Moment): void {
    this.date = moment;
    this.calendar._goToDateInView(this.date, 'month');
    this.emitDate.emit(this.date);
  }

  selectedDate(date: moment.Moment) {
    this.date = date;
    this.emitDate.emit(this.date);
  }

  private _getDateFromTaskDueDate(): moment.Moment | undefined {
    if (!this.task.dueDate) return undefined;

    const date = toMoment(this.task.dueDate);
    this.emitDate.emit(date);
    return date;
  }
}
