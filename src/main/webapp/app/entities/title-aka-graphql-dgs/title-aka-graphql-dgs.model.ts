import { IRegionGraphqlDgs } from 'app/entities/region-graphql-dgs/region-graphql-dgs.model';
import { ILanguageGraphqlDgs } from 'app/entities/language-graphql-dgs/language-graphql-dgs.model';

export interface ITitleAkaGraphqlDgs {
  id?: number;
  akaTitle?: string;
  additionalAttrs?: string | null;
  isOriginalTitle?: boolean | null;
  region?: IRegionGraphqlDgs | null;
  language?: ILanguageGraphqlDgs | null;
}

export class TitleAkaGraphqlDgs implements ITitleAkaGraphqlDgs {
  constructor(
    public id?: number,
    public akaTitle?: string,
    public additionalAttrs?: string | null,
    public isOriginalTitle?: boolean | null,
    public region?: IRegionGraphqlDgs | null,
    public language?: ILanguageGraphqlDgs | null
  ) {
    this.isOriginalTitle = this.isOriginalTitle ?? false;
  }
}

export function getTitleAkaGraphqlDgsIdentifier(titleAka: ITitleAkaGraphqlDgs): number | undefined {
  return titleAka.id;
}
