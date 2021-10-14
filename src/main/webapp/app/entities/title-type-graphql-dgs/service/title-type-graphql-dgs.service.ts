import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleTypeGraphqlDgs, getTitleTypeGraphqlDgsIdentifier } from '../title-type-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleTypeGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleTypeGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleTypeGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titleType: ITitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleTypeGraphqlDgs>(this.resourceUrl, titleType, { observe: 'response' });
  }

  update(titleType: ITitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleTypeGraphqlDgs>(`${this.resourceUrl}/${getTitleTypeGraphqlDgsIdentifier(titleType) as number}`, titleType, {
      observe: 'response',
    });
  }

  partialUpdate(titleType: ITitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleTypeGraphqlDgs>(
      `${this.resourceUrl}/${getTitleTypeGraphqlDgsIdentifier(titleType) as number}`,
      titleType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleTypeGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleTypeGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleTypeGraphqlDgsToCollectionIfMissing(
    titleTypeCollection: ITitleTypeGraphqlDgs[],
    ...titleTypesToCheck: (ITitleTypeGraphqlDgs | null | undefined)[]
  ): ITitleTypeGraphqlDgs[] {
    const titleTypes: ITitleTypeGraphqlDgs[] = titleTypesToCheck.filter(isPresent);
    if (titleTypes.length > 0) {
      const titleTypeCollectionIdentifiers = titleTypeCollection.map(titleTypeItem => getTitleTypeGraphqlDgsIdentifier(titleTypeItem)!);
      const titleTypesToAdd = titleTypes.filter(titleTypeItem => {
        const titleTypeIdentifier = getTitleTypeGraphqlDgsIdentifier(titleTypeItem);
        if (titleTypeIdentifier == null || titleTypeCollectionIdentifiers.includes(titleTypeIdentifier)) {
          return false;
        }
        titleTypeCollectionIdentifiers.push(titleTypeIdentifier);
        return true;
      });
      return [...titleTypesToAdd, ...titleTypeCollection];
    }
    return titleTypeCollection;
  }
}
