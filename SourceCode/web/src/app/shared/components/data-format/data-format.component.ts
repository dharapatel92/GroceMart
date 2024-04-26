import { Component, Input } from '@angular/core';
import { DataFormatEnum } from './data-format.enum';
import { DataFormatTypes, IDataFormatConfig } from './data-format.interface';
import { DesignService } from '../../../core/services/design.service';
import { FixDecimal } from '../../../core/functions/fix-decimal.function';

@Component({
  selector: 'data-format',
  templateUrl: './data-format.component.html',
  styleUrls: ['./data-format.component.scss']
})
export class DataFormatComponent {
  @Input() data: any = '';
  @Input() dataItem?: any;
  @Input() rowIndex?: number;
  @Input() type: DataFormatTypes;

  @Input() config?: IDataFormatConfig;
  @Input() decimal: number = 4;
  @Input() default?: string | number | undefined;

  constructor(public ds: DesignService) {}

  ngOnInit(): void {
    switch (this.type) {
      case DataFormatEnum.DATE:
        if (!!this.data && typeof this.data === 'string') {
          // this.data = moment(this.data, this.config?.inputDateFormat || 'yyyy-MM-dd').toDate();
        }
        break;

      case DataFormatEnum.TIME:
        if (!!this.data && typeof this.data === 'string') {
          // this.data = moment(this.data, this.config?.inputDateFormat || 'HH:mm:ss').toDate();
        }
        break;

      case DataFormatEnum.DATE_TIME:
        if (!!this.data && typeof this.data === 'string') {
          // this.data = moment(this.data).toDate();
        }
        break;

      case DataFormatEnum.NUMBER:
      case DataFormatEnum.ACCOUNTING:
        if (this.config?.decimal === 0 || !!this.config?.decimal) this.decimal = this.config?.decimal;
        break;

      default:
        break;
    }

    if (this.config?.default) this.default = this.config?.default;
  }

  getAccountingFormat(ds: DesignService, data: '', decimal: number) {
    if (!data || data == '') {
      return (+'0').toFixed(decimal);
    }

    let num = Number(data);

    if (num >= 0) {
      return FixDecimal(+data, decimal);
    } else {
      return '(' + FixDecimal(-1 * num, decimal) + ')';
    }
  }
}
