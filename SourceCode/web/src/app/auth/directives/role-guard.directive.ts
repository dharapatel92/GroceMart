import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SubSink } from 'subsink';
import { IRoleGuard } from '../interfaces/role-guard.interface';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[roleGuard]'
})
export class RoleGuardDirective {
  userRole!: IRoleGuard;

  private subSink = new SubSink();

  @Input()
  set roleGuard(roles: IRoleGuard) {
    if (!roles.role || !roles.id) {
      console.log('Roles value is empty or missed');
    }
    this.userRole = roles;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private authService: AuthService,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.viewContainer.clear();
    this.subSink.add(
      this.authService.userRightsChange.subscribe(() => {
        this.viewContainer.clear();
        if (this.authService.roleCheck(this.userRole)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subSink?.unsubscribe();
  }
}
