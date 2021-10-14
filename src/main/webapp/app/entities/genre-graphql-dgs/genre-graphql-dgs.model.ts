import { ITitleGenreGraphqlDgs } from 'app/entities/title-genre-graphql-dgs/title-genre-graphql-dgs.model';

export interface IGenreGraphqlDgs {
  id?: number;
  genreName?: string;
  titleGenres?: ITitleGenreGraphqlDgs[] | null;
}

export class GenreGraphqlDgs implements IGenreGraphqlDgs {
  constructor(public id?: number, public genreName?: string, public titleGenres?: ITitleGenreGraphqlDgs[] | null) {}
}

export function getGenreGraphqlDgsIdentifier(genre: IGenreGraphqlDgs): number | undefined {
  return genre.id;
}
