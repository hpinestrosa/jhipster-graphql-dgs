import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleAkaTitleTypeGraphqlDgs, TitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';
import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleAkaTitleTypeGraphqlDgsRoutingResolveService implements Resolve<ITitleAkaTitleTypeGraphqlDgs> {
  constructor(protected service: TitleAkaTitleTypeGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleAkaTitleTypeGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titleAkaTitleType: HttpResponse<TitleAkaTitleTypeGraphqlDgs>) => {
          if (titleAkaTitleType.body) {
            return of(titleAkaTitleType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleAkaTitleTypeGraphqlDgs());
  }
}
