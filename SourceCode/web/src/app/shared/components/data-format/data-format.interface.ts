import { TemplateRef } from '@angular/core';
import { DataFormatEnum } from './data-format.enum';

export interface IDataFormatConfig {
  // Default values
  default?: string | number | undefined;

  // Number options
  decimal?: number;

  // Date options
  inputDateFormat?: string;
  showDateFormat?: string;

  // Badge options
  badge?: Array<Badge>;

  template?: TemplateRef<any>;
  templateName?: string | number | undefined;

  className?: string;

  // Link options
  linkSeparator?: string;
  routerLink?: (
    data?: any,
    dataItem?: any
  ) => {
    link: string;
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    class?: string;
    disabled?: boolean;
  };
}

export type DataFormatTypes = undefined | keyof typeof DataFormatEnum;

interface Badge {
  value: any;
  type: any;
  text: string;
  size?: number;
}
