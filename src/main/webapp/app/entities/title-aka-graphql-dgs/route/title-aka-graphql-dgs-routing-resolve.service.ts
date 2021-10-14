import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleAkaGraphqlDgs, TitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';
import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleAkaGraphqlDgsRoutingResolveService implements Resolve<ITitleAkaGraphqlDgs> {
  constructor(protected service: TitleAkaGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleAkaGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titleAka: HttpResponse<TitleAkaGraphqlDgs>) => {
          if (titleAka.body) {
            return of(titleAka.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleAkaGraphqlDgs());
  }
}
