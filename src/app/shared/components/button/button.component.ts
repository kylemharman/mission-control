import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() primary = false;
  @Input() fullWidth = false;
  @Input() label: string;
  @Input() borderColor = '#cccccc';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon?: string;
  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    const mode = this.primary ? 'mc-button--primary' : 'mc-button--secondary';
    const fullWidth = this.fullWidth ? 'mc-button--fullwidth' : '';
    return ['mc-button', `mc-button--${this.size}`, mode, fullWidth];
  }
}
