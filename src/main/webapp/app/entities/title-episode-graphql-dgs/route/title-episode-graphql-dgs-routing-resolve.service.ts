import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleEpisodeGraphqlDgs, TitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';
import { TitleEpisodeGraphqlDgsService } from '../service/title-episode-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleEpisodeGraphqlDgsRoutingResolveService implements Resolve<ITitleEpisodeGraphqlDgs> {
  constructor(protected service: TitleEpisodeGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleEpisodeGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titleEpisode: HttpResponse<TitleEpisodeGraphqlDgs>) => {
          if (titleEpisode.body) {
            return of(titleEpisode.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleEpisodeGraphqlDgs());
  }
}
