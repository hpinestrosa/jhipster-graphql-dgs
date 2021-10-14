import { IRoleGraphqlDgs } from 'app/entities/role-graphql-dgs/role-graphql-dgs.model';
import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';

export interface ITalentRoleGraphqlDgs {
  id?: number;
  ord?: number;
  role?: IRoleGraphqlDgs | null;
  talent?: ITalentGraphqlDgs | null;
}

export class TalentRoleGraphqlDgs implements ITalentRoleGraphqlDgs {
  constructor(public id?: number, public ord?: number, public role?: IRoleGraphqlDgs | null, public talent?: ITalentGraphqlDgs | null) {}
}

export function getTalentRoleGraphqlDgsIdentifier(talentRole: ITalentRoleGraphqlDgs): number | undefined {
  return talentRole.id;
}
