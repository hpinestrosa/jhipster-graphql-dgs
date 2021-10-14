import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRoleGraphqlDgs, getRoleGraphqlDgsIdentifier } from '../role-graphql-dgs.model';

export type EntityResponseType = HttpResponse<IRoleGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<IRoleGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class RoleGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/roles');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(role: IRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<IRoleGraphqlDgs>(this.resourceUrl, role, { observe: 'response' });
  }

  update(role: IRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<IRoleGraphqlDgs>(`${this.resourceUrl}/${getRoleGraphqlDgsIdentifier(role) as number}`, role, {
      observe: 'response',
    });
  }

  partialUpdate(role: IRoleGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<IRoleGraphqlDgs>(`${this.resourceUrl}/${getRoleGraphqlDgsIdentifier(role) as number}`, role, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRoleGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRoleGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRoleGraphqlDgsToCollectionIfMissing(
    roleCollection: IRoleGraphqlDgs[],
    ...rolesToCheck: (IRoleGraphqlDgs | null | undefined)[]
  ): IRoleGraphqlDgs[] {
    const roles: IRoleGraphqlDgs[] = rolesToCheck.filter(isPresent);
    if (roles.length > 0) {
      const roleCollectionIdentifiers = roleCollection.map(roleItem => getRoleGraphqlDgsIdentifier(roleItem)!);
      const rolesToAdd = roles.filter(roleItem => {
        const roleIdentifier = getRoleGraphqlDgsIdentifier(roleItem);
        if (roleIdentifier == null || roleCollectionIdentifiers.includes(roleIdentifier)) {
          return false;
        }
        roleCollectionIdentifiers.push(roleIdentifier);
        return true;
      });
      return [...rolesToAdd, ...roleCollection];
    }
    return roleCollection;
  }
}
