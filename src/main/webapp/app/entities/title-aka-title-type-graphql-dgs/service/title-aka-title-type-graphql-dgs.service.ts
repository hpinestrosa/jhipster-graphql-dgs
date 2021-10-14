import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleAkaTitleTypeGraphqlDgs, getTitleAkaTitleTypeGraphqlDgsIdentifier } from '../title-aka-title-type-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleAkaTitleTypeGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleAkaTitleTypeGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleAkaTitleTypeGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-aka-title-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleAkaTitleTypeGraphqlDgs>(this.resourceUrl, titleAkaTitleType, { observe: 'response' });
  }

  update(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleAkaTitleTypeGraphqlDgs>(
      `${this.resourceUrl}/${getTitleAkaTitleTypeGraphqlDgsIdentifier(titleAkaTitleType) as number}`,
      titleAkaTitleType,
      { observe: 'response' }
    );
  }

  partialUpdate(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleAkaTitleTypeGraphqlDgs>(
      `${this.resourceUrl}/${getTitleAkaTitleTypeGraphqlDgsIdentifier(titleAkaTitleType) as number}`,
      titleAkaTitleType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleAkaTitleTypeGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleAkaTitleTypeGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing(
    titleAkaTitleTypeCollection: ITitleAkaTitleTypeGraphqlDgs[],
    ...titleAkaTitleTypesToCheck: (ITitleAkaTitleTypeGraphqlDgs | null | undefined)[]
  ): ITitleAkaTitleTypeGraphqlDgs[] {
    const titleAkaTitleTypes: ITitleAkaTitleTypeGraphqlDgs[] = titleAkaTitleTypesToCheck.filter(isPresent);
    if (titleAkaTitleTypes.length > 0) {
      const titleAkaTitleTypeCollectionIdentifiers = titleAkaTitleTypeCollection.map(
        titleAkaTitleTypeItem => getTitleAkaTitleTypeGraphqlDgsIdentifier(titleAkaTitleTypeItem)!
      );
      const titleAkaTitleTypesToAdd = titleAkaTitleTypes.filter(titleAkaTitleTypeItem => {
        const titleAkaTitleTypeIdentifier = getTitleAkaTitleTypeGraphqlDgsIdentifier(titleAkaTitleTypeItem);
        if (titleAkaTitleTypeIdentifier == null || titleAkaTitleTypeCollectionIdentifiers.includes(titleAkaTitleTypeIdentifier)) {
          return false;
        }
        titleAkaTitleTypeCollectionIdentifiers.push(titleAkaTitleTypeIdentifier);
        return true;
      });
      return [...titleAkaTitleTypesToAdd, ...titleAkaTitleTypeCollection];
    }
    return titleAkaTitleTypeCollection;
  }
}
