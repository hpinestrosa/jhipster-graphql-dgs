import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IGenreGraphqlDgs, getGenreGraphqlDgsIdentifier } from '../genre-graphql-dgs.model';

export type EntityResponseType = HttpResponse<IGenreGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<IGenreGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class GenreGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/genres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(genre: IGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<IGenreGraphqlDgs>(this.resourceUrl, genre, { observe: 'response' });
  }

  update(genre: IGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<IGenreGraphqlDgs>(`${this.resourceUrl}/${getGenreGraphqlDgsIdentifier(genre) as number}`, genre, {
      observe: 'response',
    });
  }

  partialUpdate(genre: IGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<IGenreGraphqlDgs>(`${this.resourceUrl}/${getGenreGraphqlDgsIdentifier(genre) as number}`, genre, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenreGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenreGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addGenreGraphqlDgsToCollectionIfMissing(
    genreCollection: IGenreGraphqlDgs[],
    ...genresToCheck: (IGenreGraphqlDgs | null | undefined)[]
  ): IGenreGraphqlDgs[] {
    const genres: IGenreGraphqlDgs[] = genresToCheck.filter(isPresent);
    if (genres.length > 0) {
      const genreCollectionIdentifiers = genreCollection.map(genreItem => getGenreGraphqlDgsIdentifier(genreItem)!);
      const genresToAdd = genres.filter(genreItem => {
        const genreIdentifier = getGenreGraphqlDgsIdentifier(genreItem);
        if (genreIdentifier == null || genreCollectionIdentifiers.includes(genreIdentifier)) {
          return false;
        }
        genreCollectionIdentifiers.push(genreIdentifier);
        return true;
      });
      return [...genresToAdd, ...genreCollection];
    }
    return genreCollection;
  }
}
