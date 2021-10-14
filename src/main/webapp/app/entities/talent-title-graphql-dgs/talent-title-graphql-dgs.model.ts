import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';

export interface ITalentTitleGraphqlDgs {
  id?: number;
  title?: string;
  talent?: ITalentGraphqlDgs | null;
}

export class TalentTitleGraphqlDgs implements ITalentTitleGraphqlDgs {
  constructor(public id?: number, public title?: string, public talent?: ITalentGraphqlDgs | null) {}
}

export function getTalentTitleGraphqlDgsIdentifier(talentTitle: ITalentTitleGraphqlDgs): number | undefined {
  return talentTitle.id;
}
