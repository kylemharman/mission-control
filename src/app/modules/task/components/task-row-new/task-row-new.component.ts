import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-task-row-new',
  templateUrl: './task-row-new.component.html',
  styleUrls: ['./task-row-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowNewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
