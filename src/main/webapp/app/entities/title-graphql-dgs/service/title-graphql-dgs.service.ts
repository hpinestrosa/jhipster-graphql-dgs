import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleGraphqlDgs, getTitleGraphqlDgsIdentifier } from '../title-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/titles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(title: ITitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleGraphqlDgs>(this.resourceUrl, title, { observe: 'response' });
  }

  update(title: ITitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleGraphqlDgs>(`${this.resourceUrl}/${getTitleGraphqlDgsIdentifier(title) as number}`, title, {
      observe: 'response',
    });
  }

  partialUpdate(title: ITitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleGraphqlDgs>(`${this.resourceUrl}/${getTitleGraphqlDgsIdentifier(title) as number}`, title, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleGraphqlDgsToCollectionIfMissing(
    titleCollection: ITitleGraphqlDgs[],
    ...titlesToCheck: (ITitleGraphqlDgs | null | undefined)[]
  ): ITitleGraphqlDgs[] {
    const titles: ITitleGraphqlDgs[] = titlesToCheck.filter(isPresent);
    if (titles.length > 0) {
      const titleCollectionIdentifiers = titleCollection.map(titleItem => getTitleGraphqlDgsIdentifier(titleItem)!);
      const titlesToAdd = titles.filter(titleItem => {
        const titleIdentifier = getTitleGraphqlDgsIdentifier(titleItem);
        if (titleIdentifier == null || titleCollectionIdentifiers.includes(titleIdentifier)) {
          return false;
        }
        titleCollectionIdentifiers.push(titleIdentifier);
        return true;
      });
      return [...titlesToAdd, ...titleCollection];
    }
    return titleCollection;
  }
}
