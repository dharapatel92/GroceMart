import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error500',
  standalone: true,
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error500Component {}
