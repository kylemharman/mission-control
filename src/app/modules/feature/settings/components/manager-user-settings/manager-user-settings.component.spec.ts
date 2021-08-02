import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUserSettingsComponent } from './manager-user-settings.component';

describe('ManagerUserSettingsComponent', () => {
  let component: ManagerUserSettingsComponent;
  let fixture: ComponentFixture<ManagerUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerUserSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
