import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error403',
  standalone: true,
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error403Component {}
