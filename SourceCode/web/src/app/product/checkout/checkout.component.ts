import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  quantities: number[] = [1, 1, 1];

  value: string = '';

  checked: boolean = true;

  checked2: boolean = true;

  cities = [
      { name: 'USA / New York', code: 'NY' },
      { name: 'Italy / Rome', code: 'RM' },
      { name: 'United Kingdoom / London', code: 'LDN' },
      { name: 'Turkey / Istanbul', code: 'IST' },
      { name: 'France / Paris', code: 'PRS' }
  ];

  selectedCity: string = '';

}
