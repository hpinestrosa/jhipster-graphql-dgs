import { IContentTypeGraphqlDgs } from 'app/entities/content-type-graphql-dgs/content-type-graphql-dgs.model';
import { ITitleGenreGraphqlDgs } from 'app/entities/title-genre-graphql-dgs/title-genre-graphql-dgs.model';

export interface ITitleGraphqlDgs {
  id?: number;
  primaryTitle?: string;
  originalTitle?: string | null;
  isAdult?: boolean | null;
  startYear?: number | null;
  endYear?: number | null;
  runtimeMinutes?: number | null;
  contentType?: IContentTypeGraphqlDgs | null;
  titleGenres?: ITitleGenreGraphqlDgs[] | null;
}

export class TitleGraphqlDgs implements ITitleGraphqlDgs {
  constructor(
    public id?: number,
    public primaryTitle?: string,
    public originalTitle?: string | null,
    public isAdult?: boolean | null,
    public startYear?: number | null,
    public endYear?: number | null,
    public runtimeMinutes?: number | null,
    public contentType?: IContentTypeGraphqlDgs | null,
    public titleGenres?: ITitleGenreGraphqlDgs[] | null
  ) {
    this.isAdult = this.isAdult ?? false;
  }
}

export function getTitleGraphqlDgsIdentifier(title: ITitleGraphqlDgs): number | undefined {
  return title.id;
}
