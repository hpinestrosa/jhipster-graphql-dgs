import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IGenreGraphqlDgs, GenreGraphqlDgs } from '../genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class GenreGraphqlDgsRoutingResolveService implements Resolve<IGenreGraphqlDgs> {
  constructor(protected service: GenreGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenreGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((genre: HttpResponse<GenreGraphqlDgs>) => {
          if (genre.body) {
            return of(genre.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GenreGraphqlDgs());
  }
}
