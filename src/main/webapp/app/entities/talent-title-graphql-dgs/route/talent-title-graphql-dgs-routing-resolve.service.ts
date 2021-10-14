import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITalentTitleGraphqlDgs, TalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TalentTitleGraphqlDgsRoutingResolveService implements Resolve<ITalentTitleGraphqlDgs> {
  constructor(protected service: TalentTitleGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITalentTitleGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((talentTitle: HttpResponse<TalentTitleGraphqlDgs>) => {
          if (talentTitle.body) {
            return of(talentTitle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TalentTitleGraphqlDgs());
  }
}
