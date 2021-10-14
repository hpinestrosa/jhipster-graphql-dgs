import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleTypeGraphqlDgs, TitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from '../service/title-type-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleTypeGraphqlDgsRoutingResolveService implements Resolve<ITitleTypeGraphqlDgs> {
  constructor(protected service: TitleTypeGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleTypeGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titleType: HttpResponse<TitleTypeGraphqlDgs>) => {
          if (titleType.body) {
            return of(titleType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleTypeGraphqlDgs());
  }
}
