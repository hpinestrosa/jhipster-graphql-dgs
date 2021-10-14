import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILanguageGraphqlDgs, LanguageGraphqlDgs } from '../language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class LanguageGraphqlDgsRoutingResolveService implements Resolve<ILanguageGraphqlDgs> {
  constructor(protected service: LanguageGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILanguageGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((language: HttpResponse<LanguageGraphqlDgs>) => {
          if (language.body) {
            return of(language.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LanguageGraphqlDgs());
  }
}
