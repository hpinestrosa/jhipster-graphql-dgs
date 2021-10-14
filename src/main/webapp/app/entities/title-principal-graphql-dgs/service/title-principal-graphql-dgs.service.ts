import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitlePrincipalGraphqlDgs, getTitlePrincipalGraphqlDgsIdentifier } from '../title-principal-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitlePrincipalGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitlePrincipalGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitlePrincipalGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-principals');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titlePrincipal: ITitlePrincipalGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitlePrincipalGraphqlDgs>(this.resourceUrl, titlePrincipal, { observe: 'response' });
  }

  update(titlePrincipal: ITitlePrincipalGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitlePrincipalGraphqlDgs>(
      `${this.resourceUrl}/${getTitlePrincipalGraphqlDgsIdentifier(titlePrincipal) as number}`,
      titlePrincipal,
      { observe: 'response' }
    );
  }

  partialUpdate(titlePrincipal: ITitlePrincipalGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitlePrincipalGraphqlDgs>(
      `${this.resourceUrl}/${getTitlePrincipalGraphqlDgsIdentifier(titlePrincipal) as number}`,
      titlePrincipal,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitlePrincipalGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitlePrincipalGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitlePrincipalGraphqlDgsToCollectionIfMissing(
    titlePrincipalCollection: ITitlePrincipalGraphqlDgs[],
    ...titlePrincipalsToCheck: (ITitlePrincipalGraphqlDgs | null | undefined)[]
  ): ITitlePrincipalGraphqlDgs[] {
    const titlePrincipals: ITitlePrincipalGraphqlDgs[] = titlePrincipalsToCheck.filter(isPresent);
    if (titlePrincipals.length > 0) {
      const titlePrincipalCollectionIdentifiers = titlePrincipalCollection.map(
        titlePrincipalItem => getTitlePrincipalGraphqlDgsIdentifier(titlePrincipalItem)!
      );
      const titlePrincipalsToAdd = titlePrincipals.filter(titlePrincipalItem => {
        const titlePrincipalIdentifier = getTitlePrincipalGraphqlDgsIdentifier(titlePrincipalItem);
        if (titlePrincipalIdentifier == null || titlePrincipalCollectionIdentifiers.includes(titlePrincipalIdentifier)) {
          return false;
        }
        titlePrincipalCollectionIdentifiers.push(titlePrincipalIdentifier);
        return true;
      });
      return [...titlePrincipalsToAdd, ...titlePrincipalCollection];
    }
    return titlePrincipalCollection;
  }
}
