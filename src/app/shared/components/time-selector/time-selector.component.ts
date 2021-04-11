import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { ITask } from 'src/app/core/models/task';
import { WithRef } from '../../helpers/firebase';
import { getIntervals, toMoment } from '../../helpers/time';

@Component({
  selector: 'mc-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSelectorComponent implements OnDestroy, OnInit {
  private _onDestroy$: Subject<void> = new Subject();
  @Input() task: WithRef<ITask>;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() interval: number = 15;
  @Input() appearance: string = 'outline';
  @Output() emitTime = new EventEmitter<string>();

  @ViewChild('timeInput', { read: MatAutocompleteTrigger })
  timeInput: MatAutocompleteTrigger;

  time: FormControl = new FormControl();
  timeInterval: string[];
  filteredOptions$: Observable<string[]>;

  constructor() {
    this.timeInterval = getIntervals(this.interval);
    this.filteredOptions$ = this.time.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTimes(value))
    );

    this.time.valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((time) => this.emitTime.emit(time));
  }

  ngOnInit(): void {
    this.time.setValue(this._getTimeFromTaskDueDate());
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  closeTimeInput(): void {
    this.timeInput.closePanel();
  }

  private _filterTimes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeInterval.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _getTimeFromTaskDueDate(): string {
    if (!this.task.dueDate) return '';
    return toMoment(this.task.dueDate).format('h:mm a');
  }
}
