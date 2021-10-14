import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IContentTypeGraphqlDgs, ContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';

@Injectable({ providedIn: 'root' })
export class ContentTypeGraphqlDgsRoutingResolveService implements Resolve<IContentTypeGraphqlDgs> {
  constructor(protected service: ContentTypeGraphqlDgsService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContentTypeGraphqlDgs> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((contentType: HttpResponse<ContentTypeGraphqlDgs>) => {
          if (contentType.body) {
            return of(contentType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ContentTypeGraphqlDgs());
  }
}
