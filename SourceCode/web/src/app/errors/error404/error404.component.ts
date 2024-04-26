import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  standalone: true,
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Error404Component {}
