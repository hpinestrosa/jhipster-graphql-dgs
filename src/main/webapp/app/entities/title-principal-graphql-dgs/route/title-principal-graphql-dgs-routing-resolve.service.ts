import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitlePrincipalGraphqlDgs, TitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';
import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitlePrincipalGraphqlDgsRoutingResolveService implements Resolve<ITitlePrincipalGraphqlDgs> {
  constructor(protected service: TitlePrincipalGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitlePrincipalGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titlePrincipal: HttpResponse<TitlePrincipalGraphqlDgs>) => {
          if (titlePrincipal.body) {
            return of(titlePrincipal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitlePrincipalGraphqlDgs());
  }
}
