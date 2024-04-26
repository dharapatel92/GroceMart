
import { RoleEnum } from '../enums/role.enum';

export interface IRoleGuard {
  role: RoleType;
  id: any;
}

type RoleType = keyof typeof RoleEnum;
