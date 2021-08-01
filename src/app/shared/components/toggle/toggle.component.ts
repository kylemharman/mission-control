import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'mc-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleComponent {
  @Input() on: boolean;
  @Input() size?: 'small' | 'large' = 'small';
  @Output() toggle = new EventEmitter<boolean>();

  onToggle(e): void {
    this.on = !this.on;
    this.toggle.emit(e.target.checked);
  }

  public get toggleClasses(): string[] {
    return ['mc-toggle', `mc-toggle-${this.size}`];
  }
  public get sliderClasses(): string[] {
    return ['mc-slider', `mc-slider-${this.size}`];
  }
}
