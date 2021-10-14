import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITalentTitleGraphqlDgs, getTalentTitleGraphqlDgsIdentifier } from '../talent-title-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITalentTitleGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITalentTitleGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TalentTitleGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/talent-titles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(talentTitle: ITalentTitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITalentTitleGraphqlDgs>(this.resourceUrl, talentTitle, { observe: 'response' });
  }

  update(talentTitle: ITalentTitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITalentTitleGraphqlDgs>(
      `${this.resourceUrl}/${getTalentTitleGraphqlDgsIdentifier(talentTitle) as number}`,
      talentTitle,
      { observe: 'response' }
    );
  }

  partialUpdate(talentTitle: ITalentTitleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITalentTitleGraphqlDgs>(
      `${this.resourceUrl}/${getTalentTitleGraphqlDgsIdentifier(talentTitle) as number}`,
      talentTitle,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITalentTitleGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITalentTitleGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTalentTitleGraphqlDgsToCollectionIfMissing(
    talentTitleCollection: ITalentTitleGraphqlDgs[],
    ...talentTitlesToCheck: (ITalentTitleGraphqlDgs | null | undefined)[]
  ): ITalentTitleGraphqlDgs[] {
    const talentTitles: ITalentTitleGraphqlDgs[] = talentTitlesToCheck.filter(isPresent);
    if (talentTitles.length > 0) {
      const talentTitleCollectionIdentifiers = talentTitleCollection.map(
        talentTitleItem => getTalentTitleGraphqlDgsIdentifier(talentTitleItem)!
      );
      const talentTitlesToAdd = talentTitles.filter(talentTitleItem => {
        const talentTitleIdentifier = getTalentTitleGraphqlDgsIdentifier(talentTitleItem);
        if (talentTitleIdentifier == null || talentTitleCollectionIdentifiers.includes(talentTitleIdentifier)) {
          return false;
        }
        talentTitleCollectionIdentifiers.push(talentTitleIdentifier);
        return true;
      });
      return [...talentTitlesToAdd, ...talentTitleCollection];
    }
    return talentTitleCollection;
  }
}
