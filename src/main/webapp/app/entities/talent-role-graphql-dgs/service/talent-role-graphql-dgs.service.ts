import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITalentRoleGraphqlDgs, getTalentRoleGraphqlDgsIdentifier } from '../talent-role-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ITalentRoleGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ITalentRoleGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class TalentRoleGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/talent-roles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(talentRole: ITalentRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ITalentRoleGraphqlDgs>(this.resourceUrl, talentRole, { observe: 'response' });
  }

  update(talentRole: ITalentRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ITalentRoleGraphqlDgs>(
      `${this.resourceUrl}/${getTalentRoleGraphqlDgsIdentifier(talentRole) as number}`,
      talentRole,
      { observe: 'response' }
    );
  }

  partialUpdate(talentRole: ITalentRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ITalentRoleGraphqlDgs>(
      `${this.resourceUrl}/${getTalentRoleGraphqlDgsIdentifier(talentRole) as number}`,
      talentRole,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITalentRoleGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITalentRoleGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTalentRoleGraphqlDgsToCollectionIfMissing(
    talentRoleCollection: ITalentRoleGraphqlDgs[],
    ...talentRolesToCheck: (ITalentRoleGraphqlDgs | null | undefined)[]
  ): ITalentRoleGraphqlDgs[] {
    const talentRoles: ITalentRoleGraphqlDgs[] = talentRolesToCheck.filter(isPresent);
    if (talentRoles.length > 0) {
      const talentRoleCollectionIdentifiers = talentRoleCollection.map(
        talentRoleItem => getTalentRoleGraphqlDgsIdentifier(talentRoleItem)!
      );
      const talentRolesToAdd = talentRoles.filter(talentRoleItem => {
        const talentRoleIdentifier = getTalentRoleGraphqlDgsIdentifier(talentRoleItem);
        if (talentRoleIdentifier == null || talentRoleCollectionIdentifiers.includes(talentRoleIdentifier)) {
          return false;
        }
        talentRoleCollectionIdentifiers.push(talentRoleIdentifier);
        return true;
      });
      return [...talentRolesToAdd, ...talentRoleCollection];
    }
    return talentRoleCollection;
  }
}
