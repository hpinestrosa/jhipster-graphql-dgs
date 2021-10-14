import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ILanguageGraphqlDgs, getLanguageGraphqlDgsIdentifier } from '../language-graphql-dgs.model';

export type EntityResponseType = HttpResponse<ILanguageGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<ILanguageGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class LanguageGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/languages');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(language: ILanguageGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<ILanguageGraphqlDgs>(this.resourceUrl, language, { observe: 'response' });
  }

  update(language: ILanguageGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<ILanguageGraphqlDgs>(`${this.resourceUrl}/${getLanguageGraphqlDgsIdentifier(language) as number}`, language, {
      observe: 'response',
    });
  }

  partialUpdate(language: ILanguageGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<ILanguageGraphqlDgs>(`${this.resourceUrl}/${getLanguageGraphqlDgsIdentifier(language) as number}`, language, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILanguageGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILanguageGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addLanguageGraphqlDgsToCollectionIfMissing(
    languageCollection: ILanguageGraphqlDgs[],
    ...languagesToCheck: (ILanguageGraphqlDgs | null | undefined)[]
  ): ILanguageGraphqlDgs[] {
    const languages: ILanguageGraphqlDgs[] = languagesToCheck.filter(isPresent);
    if (languages.length > 0) {
      const languageCollectionIdentifiers = languageCollection.map(languageItem => getLanguageGraphqlDgsIdentifier(languageItem)!);
      const languagesToAdd = languages.filter(languageItem => {
        const languageIdentifier = getLanguageGraphqlDgsIdentifier(languageItem);
        if (languageIdentifier == null || languageCollectionIdentifiers.includes(languageIdentifier)) {
          return false;
        }
        languageCollectionIdentifiers.push(languageIdentifier);
        return true;
      });
      return [...languagesToAdd, ...languageCollection];
    }
    return languageCollection;
  }
}
