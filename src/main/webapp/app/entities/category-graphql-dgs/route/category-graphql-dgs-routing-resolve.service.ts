import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICategoryGraphqlDgs, CategoryGraphqlDgs } from '../category-graphql-dgs.model';
import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class CategoryGraphqlDgsRoutingResolveService implements Resolve<ICategoryGraphqlDgs> {
  constructor(protected service: CategoryGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategoryGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((category: HttpResponse<CategoryGraphqlDgs>) => {
          if (category.body) {
            return of(category.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CategoryGraphqlDgs());
  }
}
