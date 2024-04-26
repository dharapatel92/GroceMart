import { Injectable } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccessKey } from '../constants/access-key.const';
import { FixDecimal } from '../functions/fix-decimal.function';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  readonly accessKey = AccessKey;
  readonly fixDecimal = FixDecimal;
  readonly dialog!: DialogService;
  readonly confirm!: ConfirmationService;
  readonly message!: MessageService;

  private breadcrumbList: BehaviorSubject<Array<MenuItem>> = new BehaviorSubject<Array<MenuItem>>([]);
  breadcrumbList$: Observable<Array<MenuItem>> = this.breadcrumbList.asObservable();

  private pageTitle: BehaviorSubject<string> = new BehaviorSubject<string>('Credit Society');
  pageTitle$: Observable<string> = this.pageTitle.asObservable();

  constructor(
    private dialogS: DialogService,
    private confirmS: ConfirmationService,
    private messageS: MessageService
  ) {
    this.dialog = this.dialogS;
    this.confirm = this.confirmS;
    this.message = this.messageS;
  }

  setBannerHeight() {
    const banner: HTMLDivElement | null = document.querySelector('#pro-banner');
    const height = banner?.offsetHeight;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--pro-banner-height', `${height}px`);
  }

  setHeaderHeight() {
    const header: HTMLDivElement | null = document.querySelector('#pro-header');
    const height = header?.offsetHeight;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--pro-header-height', `${height}px`);
  }

  setBreadcrumbHeight() {
    const breadcrumb: HTMLDivElement | null = document.querySelector('#pro-breadcrumb');
    const height = breadcrumb?.offsetHeight;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--pro-breadcrumb-height', `${height}px`);
  }

  setSidebarWidth() {
    const sidebar: HTMLDivElement | null = document.querySelector('#pro-sidebar');
    const width = sidebar?.offsetWidth;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--pro-sidebar-width', `${width}px`);
  }

  setFooterHeight() {
    const footer: HTMLDivElement | null = document.querySelector('#pro-footer');
    const height = footer?.offsetHeight;

    const root: HTMLHtmlElement | null = document.querySelector(':root');
    root?.style.setProperty('--pro-footer-height', `${height}px`);
  }

  showError(error: any) {
    const msg: string = error?.error?.message || error?.message || error || '';
    this.message.add({ severity: 'error', summary: 'Error', detail: msg });
  }

  showSuccess(success: any) {
    const msg: string = success?.success?.message || success?.message || success || '';
    this.message.add({ severity: 'Success', summary: 'Success', detail: msg });
  }

  showWarning(warning: any) {
    const msg: string = warning?.warning?.message || warning?.message || warning || '';
    this.message.add({ severity: 'Warning', summary: 'Warning', detail: msg });
  }

  showInfo(info: any) {
    const msg: string = info?.info?.message || info?.message || info || '';
    this.message.add({ severity: 'Info', summary: 'Info', detail: msg });
  }

  setBreadcrumbs(breadcrumbs: Array<MenuItem>) {
    this.breadcrumbList.next(breadcrumbs);
  }

  setPageTitle(pageTitle: string) {
    document.title = `Credit Society : ${pageTitle}`;
    this.pageTitle.next(pageTitle);
  }
}
