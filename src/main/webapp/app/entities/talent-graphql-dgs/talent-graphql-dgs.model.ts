import { ITalentRoleGraphqlDgs } from 'app/entities/talent-role-graphql-dgs/talent-role-graphql-dgs.model';

export interface ITalentGraphqlDgs {
  id?: number;
  talentName?: string;
  birthYear?: number | null;
  deathYear?: number | null;
  talentRoles?: ITalentRoleGraphqlDgs[] | null;
}

export class TalentGraphqlDgs implements ITalentGraphqlDgs {
  constructor(
    public id?: number,
    public talentName?: string,
    public birthYear?: number | null,
    public deathYear?: number | null,
    public talentRoles?: ITalentRoleGraphqlDgs[] | null
  ) {}
}

export function getTalentGraphqlDgsIdentifier(talent: ITalentGraphqlDgs): number | undefined {
  return talent.id;
}
