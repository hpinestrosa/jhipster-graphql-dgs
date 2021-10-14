import { ITalentRoleGraphqlDgs } from 'app/entities/talent-role-graphql-dgs/talent-role-graphql-dgs.model';

export interface IRoleGraphqlDgs {
  id?: number;
  roleName?: string;
  talentRoles?: ITalentRoleGraphqlDgs[] | null;
}

export class RoleGraphqlDgs implements IRoleGraphqlDgs {
  constructor(public id?: number, public roleName?: string, public talentRoles?: ITalentRoleGraphqlDgs[] | null) {}
}

export function getRoleGraphqlDgsIdentifier(role: IRoleGraphqlDgs): number | undefined {
  return role.id;
}
