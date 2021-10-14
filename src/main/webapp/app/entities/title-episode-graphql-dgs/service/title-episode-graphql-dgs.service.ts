import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleEpisodeGraphqlDgs, getTitleEpisodeGraphqlDgsIdentifier } from '../title-episode-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleEpisodeGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleEpisodeGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleEpisodeGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-episodes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titleEpisode: ITitleEpisodeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleEpisodeGraphqlDgs>(this.resourceUrl, titleEpisode, { observe: 'response' });
  }

  update(titleEpisode: ITitleEpisodeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleEpisodeGraphqlDgs>(
      `${this.resourceUrl}/${getTitleEpisodeGraphqlDgsIdentifier(titleEpisode) as number}`,
      titleEpisode,
      { observe: 'response' }
    );
  }

  partialUpdate(titleEpisode: ITitleEpisodeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleEpisodeGraphqlDgs>(
      `${this.resourceUrl}/${getTitleEpisodeGraphqlDgsIdentifier(titleEpisode) as number}`,
      titleEpisode,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleEpisodeGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleEpisodeGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleEpisodeGraphqlDgsToCollectionIfMissing(
    titleEpisodeCollection: ITitleEpisodeGraphqlDgs[],
    ...titleEpisodesToCheck: (ITitleEpisodeGraphqlDgs | null | undefined)[]
  ): ITitleEpisodeGraphqlDgs[] {
    const titleEpisodes: ITitleEpisodeGraphqlDgs[] = titleEpisodesToCheck.filter(isPresent);
    if (titleEpisodes.length > 0) {
      const titleEpisodeCollectionIdentifiers = titleEpisodeCollection.map(
        titleEpisodeItem => getTitleEpisodeGraphqlDgsIdentifier(titleEpisodeItem)!
      );
      const titleEpisodesToAdd = titleEpisodes.filter(titleEpisodeItem => {
        const titleEpisodeIdentifier = getTitleEpisodeGraphqlDgsIdentifier(titleEpisodeItem);
        if (titleEpisodeIdentifier == null || titleEpisodeCollectionIdentifiers.includes(titleEpisodeIdentifier)) {
          return false;
        }
        titleEpisodeCollectionIdentifiers.push(titleEpisodeIdentifier);
        return true;
      });
      return [...titleEpisodesToAdd, ...titleEpisodeCollection];
    }
    return titleEpisodeCollection;
  }
}
