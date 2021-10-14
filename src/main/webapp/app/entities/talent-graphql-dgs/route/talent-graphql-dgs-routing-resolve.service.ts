import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITalentGraphqlDgs, TalentGraphqlDgs } from '../talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TalentGraphqlDgsRoutingResolveService implements Resolve<ITalentGraphqlDgs> {
  constructor(protected service: TalentGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITalentGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((talent: HttpResponse<TalentGraphqlDgs>) => {
          if (talent.body) {
            return of(talent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TalentGraphqlDgs());
  }
}
