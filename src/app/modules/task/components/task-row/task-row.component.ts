import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskRowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
