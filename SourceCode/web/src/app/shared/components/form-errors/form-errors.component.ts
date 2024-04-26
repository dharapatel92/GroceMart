import { Component, Input } from '@angular/core';
import { ControlDirective } from '../../directives/control.directive';

@Component({
  selector: 'form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent {
  Object = Object;
  @Input({ required: true }) text: string = 'Field';
  control!: any;
  @Input({ required: true }) controlRef!: ControlDirective;
  @Input() message: { [key in string]: string } = {};
  @Input() hideErrorFor: Array<string> = [];

  ngOnInit() {
    this.control = this.controlRef.control.control;
  }
}
