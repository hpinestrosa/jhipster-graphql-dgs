import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITalentGraphqlDgs, getTalentGraphqlDgsIdentifier } from '../talent-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITalentGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITalentGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TalentGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/talents');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(talent: ITalentGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITalentGraphqlDgs>(this.resourceUrl, talent, { observe: 'response' });
  }

  update(talent: ITalentGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITalentGraphqlDgs>(`${this.resourceUrl}/${getTalentGraphqlDgsIdentifier(talent) as number}`, talent, {
      observe: 'response',
    });
  }

  partialUpdate(talent: ITalentGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITalentGraphqlDgs>(`${this.resourceUrl}/${getTalentGraphqlDgsIdentifier(talent) as number}`, talent, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITalentGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITalentGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTalentGraphqlDgsToCollectionIfMissing(
    talentCollection: ITalentGraphqlDgs[],
    ...talentsToCheck: (ITalentGraphqlDgs | null | undefined)[]
  ): ITalentGraphqlDgs[] {
    const talents: ITalentGraphqlDgs[] = talentsToCheck.filter(isPresent);
    if (talents.length > 0) {
      const talentCollectionIdentifiers = talentCollection.map(talentItem => getTalentGraphqlDgsIdentifier(talentItem)!);
      const talentsToAdd = talents.filter(talentItem => {
        const talentIdentifier = getTalentGraphqlDgsIdentifier(talentItem);
        if (talentIdentifier == null || talentCollectionIdentifiers.includes(talentIdentifier)) {
          return false;
        }
        talentCollectionIdentifiers.push(talentIdentifier);
        return true;
      });
      return [...talentsToAdd, ...talentCollection];
    }
    return talentCollection;
  }
}
