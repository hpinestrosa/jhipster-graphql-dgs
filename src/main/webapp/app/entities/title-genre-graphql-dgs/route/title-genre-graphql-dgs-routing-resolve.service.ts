import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITitleGenreGraphqlDgs, TitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class TitleGenreGraphqlDgsRoutingResolveService implements Resolve<ITitleGenreGraphqlDgs> {
  constructor(protected service: TitleGenreGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITitleGenreGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((titleGenre: HttpResponse<TitleGenreGraphqlDgs>) => {
          if (titleGenre.body) {
            return of(titleGenre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TitleGenreGraphqlDgs());
  }
}
