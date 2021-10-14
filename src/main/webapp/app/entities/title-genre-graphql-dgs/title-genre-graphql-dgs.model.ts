import { IGenreGraphqlDgs } from 'app/entities/genre-graphql-dgs/genre-graphql-dgs.model';
import { ITitleGraphqlDgs } from 'app/entities/title-graphql-dgs/title-graphql-dgs.model';

export interface ITitleGenreGraphqlDgs {
  id?: number;
  ord?: number;
  genre?: IGenreGraphqlDgs | null;
  title?: ITitleGraphqlDgs | null;
}

export class TitleGenreGraphqlDgs implements ITitleGenreGraphqlDgs {
  constructor(public id?: number, public ord?: number, public genre?: IGenreGraphqlDgs | null, public title?: ITitleGraphqlDgs | null) {}
}

export function getTitleGenreGraphqlDgsIdentifier(titleGenre: ITitleGenreGraphqlDgs): number | undefined {
  return titleGenre.id;
}
