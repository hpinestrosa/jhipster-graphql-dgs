import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITalentRoleGraphqlDgs, TalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TalentRoleGraphqlDgsRoutingResolveService implements Resolve<ITalentRoleGraphqlDgs> {
  constructor(protected service: TalentRoleGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITalentRoleGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((talentRole: HttpResponse<TalentRoleGraphqlDgs>) => {
          if (talentRole.body) {
            return of(talentRole.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TalentRoleGraphqlDgs());
  }
}
