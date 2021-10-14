import { ITitleTypeGraphqlDgs } from 'app/entities/title-type-graphql-dgs/title-type-graphql-dgs.model';

export interface ITitleAkaTitleTypeGraphqlDgs {
  id?: number;
  titleType?: ITitleTypeGraphqlDgs | null;
}

export class TitleAkaTitleTypeGraphqlDgs implements ITitleAkaTitleTypeGraphqlDgs {
  constructor(public id?: number, public titleType?: ITitleTypeGraphqlDgs | null) {}
}

export function getTitleAkaTitleTypeGraphqlDgsIdentifier(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): number | undefined {
  return titleAkaTitleType.id;
}
