import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleGraphqlDgs, TitleGraphqlDgs } from '../title-graphql-dgs.model';
import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleGraphqlDgsRoutingResolveService implements Resolve<ITitleGraphqlDgs> {
  constructor(protected service: TitleGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((title: HttpResponse<TitleGraphqlDgs>) => {
          if (title.body) {
            return of(title.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleGraphqlDgs());
  }
}
