import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRoleGraphqlDgs, RoleGraphqlDgs } from '../role-graphql-dgs.model';
import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class RoleGraphqlDgsRoutingResolveService implements Resolve<IRoleGraphqlDgs> {
  constructor(protected service: RoleGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRoleGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((role: HttpResponse<RoleGraphqlDgs>) => {
          if (role.body) {
            return of(role.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RoleGraphqlDgs());
  }
}
