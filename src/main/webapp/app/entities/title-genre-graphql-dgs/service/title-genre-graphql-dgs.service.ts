import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleGenreGraphqlDgs, getTitleGenreGraphqlDgsIdentifier } from '../title-genre-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleGenreGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleGenreGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleGenreGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-genres');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titleGenre: ITitleGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleGenreGraphqlDgs>(this.resourceUrl, titleGenre, { observe: 'response' });
  }

  update(titleGenre: ITitleGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleGenreGraphqlDgs>(
      `${this.resourceUrl}/${getTitleGenreGraphqlDgsIdentifier(titleGenre) as number}`,
      titleGenre,
      { observe: 'response' }
    );
  }

  partialUpdate(titleGenre: ITitleGenreGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleGenreGraphqlDgs>(
      `${this.resourceUrl}/${getTitleGenreGraphqlDgsIdentifier(titleGenre) as number}`,
      titleGenre,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleGenreGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleGenreGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleGenreGraphqlDgsToCollectionIfMissing(
    titleGenreCollection: ITitleGenreGraphqlDgs[],
    ...titleGenresToCheck: (ITitleGenreGraphqlDgs | null | undefined)[]
  ): ITitleGenreGraphqlDgs[] {
    const titleGenres: ITitleGenreGraphqlDgs[] = titleGenresToCheck.filter(isPresent);
    if (titleGenres.length > 0) {
      const titleGenreCollectionIdentifiers = titleGenreCollection.map(
        titleGenreItem => getTitleGenreGraphqlDgsIdentifier(titleGenreItem)!
      );
      const titleGenresToAdd = titleGenres.filter(titleGenreItem => {
        const titleGenreIdentifier = getTitleGenreGraphqlDgsIdentifier(titleGenreItem);
        if (titleGenreIdentifier == null || titleGenreCollectionIdentifiers.includes(titleGenreIdentifier)) {
          return false;
        }
        titleGenreCollectionIdentifiers.push(titleGenreIdentifier);
        return true;
      });
      return [...titleGenresToAdd, ...titleGenreCollection];
    }
    return titleGenreCollection;
  }
}
