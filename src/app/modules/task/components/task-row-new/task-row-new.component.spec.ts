import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRowNewComponent } from './task-row-new.component';

describe('TaskRowNewComponent', () => {
  let component: TaskRowNewComponent;
  let fixture: ComponentFixture<TaskRowNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskRowNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRowNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
