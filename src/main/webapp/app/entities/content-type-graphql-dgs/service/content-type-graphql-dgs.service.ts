import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IContentTypeGraphqlDgs, getContentTypeGraphqlDgsIdentifier } from '../content-type-graphql-dgs.model';

export type EntityResponseType = HttpResponse<IContentTypeGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<IContentTypeGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class ContentTypeGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/content-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(contentType: IContentTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<IContentTypeGraphqlDgs>(this.resourceUrl, contentType, { observe: 'response' });
  }

  update(contentType: IContentTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<IContentTypeGraphqlDgs>(
      `${this.resourceUrl}/${getContentTypeGraphqlDgsIdentifier(contentType) as number}`,
      contentType,
      { observe: 'response' }
    );
  }

  partialUpdate(contentType: IContentTypeGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<IContentTypeGraphqlDgs>(
      `${this.resourceUrl}/${getContentTypeGraphqlDgsIdentifier(contentType) as number}`,
      contentType,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContentTypeGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContentTypeGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addContentTypeGraphqlDgsToCollectionIfMissing(
    contentTypeCollection: IContentTypeGraphqlDgs[],
    ...contentTypesToCheck: (IContentTypeGraphqlDgs | null | undefined)[]
  ): IContentTypeGraphqlDgs[] {
    const contentTypes: IContentTypeGraphqlDgs[] = contentTypesToCheck.filter(isPresent);
    if (contentTypes.length > 0) {
      const contentTypeCollectionIdentifiers = contentTypeCollection.map(
        contentTypeItem => getContentTypeGraphqlDgsIdentifier(contentTypeItem)!
      );
      const contentTypesToAdd = contentTypes.filter(contentTypeItem => {
        const contentTypeIdentifier = getContentTypeGraphqlDgsIdentifier(contentTypeItem);
        if (contentTypeIdentifier == null || contentTypeCollectionIdentifiers.includes(contentTypeIdentifier)) {
          return false;
        }
        contentTypeCollectionIdentifiers.push(contentTypeIdentifier);
        return true;
      });
      return [...contentTypesToAdd, ...contentTypeCollection];
    }
    return contentTypeCollection;
  }
}
