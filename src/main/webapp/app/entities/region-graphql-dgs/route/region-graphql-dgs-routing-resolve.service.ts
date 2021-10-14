import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegionGraphqlDgs, RegionGraphqlDgs } from '../region-graphql-dgs.model';
import { RegionGraphqlDgsService } from '../service/region-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class RegionGraphqlDgsRoutingResolveService implements Resolve<IRegionGraphqlDgs> {
  constructor(protected service: RegionGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((region: HttpResponse<RegionGraphqlDgs>) => {
          if (region.body) {
            return of(region.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RegionGraphqlDgs());
  }
}
