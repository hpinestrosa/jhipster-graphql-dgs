import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITitleAkaGraphqlDgs, getTitleAkaGraphqlDgsIdentifier } from '../title-aka-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITitleAkaGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITitleAkaGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TitleAkaGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/title-akas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(titleAka: ITitleAkaGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITitleAkaGraphqlDgs>(this.resourceUrl, titleAka, { observe: 'response' });
  }

  update(titleAka: ITitleAkaGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITitleAkaGraphqlDgs>(`${this.resourceUrl}/${getTitleAkaGraphqlDgsIdentifier(titleAka) as number}`, titleAka, {
      observe: 'response',
    });
  }

  partialUpdate(titleAka: ITitleAkaGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITitleAkaGraphqlDgs>(`${this.resourceUrl}/${getTitleAkaGraphqlDgsIdentifier(titleAka) as number}`, titleAka, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITitleAkaGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITitleAkaGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTitleAkaGraphqlDgsToCollectionIfMissing(
    titleAkaCollection: ITitleAkaGraphqlDgs[],
    ...titleAkasToCheck: (ITitleAkaGraphqlDgs | null | undefined)[]
  ): ITitleAkaGraphqlDgs[] {
    const titleAkas: ITitleAkaGraphqlDgs[] = titleAkasToCheck.filter(isPresent);
    if (titleAkas.length > 0) {
      const titleAkaCollectionIdentifiers = titleAkaCollection.map(titleAkaItem => getTitleAkaGraphqlDgsIdentifier(titleAkaItem)!);
      const titleAkasToAdd = titleAkas.filter(titleAkaItem => {
        const titleAkaIdentifier = getTitleAkaGraphqlDgsIdentifier(titleAkaItem);
        if (titleAkaIdentifier == null || titleAkaCollectionIdentifiers.includes(titleAkaIdentifier)) {
          return false;
        }
        titleAkaCollectionIdentifiers.push(titleAkaIdentifier);
        return true;
      });
      return [...titleAkasToAdd, ...titleAkaCollection];
    }
    return titleAkaCollection;
  }
}
