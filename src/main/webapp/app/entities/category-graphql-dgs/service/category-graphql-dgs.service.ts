import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICategoryGraphqlDgs, getCategoryGraphqlDgsIdentifier } from '../category-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ICategoryGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ICategoryGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class CategoryGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/categories');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(category: ICategoryGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ICategoryGraphqlDgs>(this.resourceUrl, category, { observe: 'response' });
  }

  update(category: ICategoryGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ICategoryGraphqlDgs>(`${this.resourceUrl}/${getCategoryGraphqlDgsIdentifier(category) as number}`, category, {
      observe: 'response',
    });
  }

  partialUpdate(category: ICategoryGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ICategoryGraphqlDgs>(`${this.resourceUrl}/${getCategoryGraphqlDgsIdentifier(category) as number}`, category, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICategoryGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICategoryGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCategoryGraphqlDgsToCollectionIfMissing(
    categoryCollection: ICategoryGraphqlDgs[],
    ...categoriesToCheck: (ICategoryGraphqlDgs | null | undefined)[]
  ): ICategoryGraphqlDgs[] {
    const categories: ICategoryGraphqlDgs[] = categoriesToCheck.filter(isPresent);
    if (categories.length > 0) {
      const categoryCollectionIdentifiers = categoryCollection.map(categoryItem => getCategoryGraphqlDgsIdentifier(categoryItem)!);
      const categoriesToAdd = categories.filter(categoryItem => {
        const categoryIdentifier = getCategoryGraphqlDgsIdentifier(categoryItem);
        if (categoryIdentifier == null || categoryCollectionIdentifiers.includes(categoryIdentifier)) {
          return false;
        }
        categoryCollectionIdentifiers.push(categoryIdentifier);
        return true;
      });
      return [...categoriesToAdd, ...categoryCollection];
    }
    return categoryCollection;
  }
}
