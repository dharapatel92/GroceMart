import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgxResizeObserverModule } from "ngx-resize-observer";
import { DataFormatComponent } from "./components/data-format/data-format.component";
import { FormErrorsComponent } from "./components/form-errors/form-errors.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { SearchFieldComponent } from "./components/search-field/search-field.component";
import { AssignTemplateDirective } from "./directives/assign-template.directive";
import { ControlDirective } from "./directives/control.directive";
import { DateFormatDirective } from "./directives/date-format.directive";
import { InvalidTrapDirective } from "./directives/invalid-trap.directive";
import {
  OnEnterDropdownNextElementDirective,
  OnEnterNextElementDirective,
} from "./directives/on-enter-next-element.directive";
import { StopPropagationDirective } from "./directives/stop-propagation.directive";
import { UniqueValidatorDirective } from "./directives/unique-validator.directive";
import { LoadingTableComponent } from "./loading-table/loading-table.component";
import { PrimengModule } from "./module/primeng/primeng.module";
import { NoDataInTableComponent } from "./no-data-in-table/no-data-in-table.component";
import { SingleCallFunctionPipe } from "./pipes/single-call-function.pipe";
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";

const components: any[] = [
  DataFormatComponent,
  FormErrorsComponent,
  LoaderComponent,
  SearchFieldComponent,
  NoDataInTableComponent,
  LoadingTableComponent,
];
const directives: any[] = [
  UniqueValidatorDirective,
  StopPropagationDirective,
  AssignTemplateDirective,
  DateFormatDirective,
  ControlDirective,
  InvalidTrapDirective,
  OnEnterNextElementDirective,
  OnEnterDropdownNextElementDirective,
];
const pipes: any[] = [SingleCallFunctionPipe];

const declarations: any[] = [...components, ...directives, ...pipes];
const imports: any[] = [
  CommonModule,
  PrimengModule,
  NgxResizeObserverModule,
  FormsModule,
  ReactiveFormsModule,
  TranslateModule,
  RouterModule,
  ToastModule,
];

const providers: any[] = [MessageService];

@NgModule({
  declarations: [...declarations],
  imports: [...imports],
  exports: [...declarations, ...imports],
  providers: [...providers],
})
export class SharedModule {}
