import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error401',
  standalone: true,
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error401Component {}
