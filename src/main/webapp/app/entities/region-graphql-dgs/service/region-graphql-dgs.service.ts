import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegionGraphqlDgs, getRegionGraphqlDgsIdentifier } from '../region-graphql-dgs.model';

export type EntityResponseType = HttpResponse<IRegionGraphqlDgs>;
export type EntityArrayResponseType = HttpResponse<IRegionGraphqlDgs[]>;

@Injectable({ providedIn: 'root' })
export class RegionGraphqlDgsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/regions');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(region: IRegionGraphqlDgs): Observable<EntityResponseType> {
    return this.http.post<IRegionGraphqlDgs>(this.resourceUrl, region, { observe: 'response' });
  }

  update(region: IRegionGraphqlDgs): Observable<EntityResponseType> {
    return this.http.put<IRegionGraphqlDgs>(`${this.resourceUrl}/${getRegionGraphqlDgsIdentifier(region) as number}`, region, {
      observe: 'response',
    });
  }

  partialUpdate(region: IRegionGraphqlDgs): Observable<EntityResponseType> {
    return this.http.patch<IRegionGraphqlDgs>(`${this.resourceUrl}/${getRegionGraphqlDgsIdentifier(region) as number}`, region, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionGraphqlDgs>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionGraphqlDgs[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addRegionGraphqlDgsToCollectionIfMissing(
    regionCollection: IRegionGraphqlDgs[],
    ...regionsToCheck: (IRegionGraphqlDgs | null | undefined)[]
  ): IRegionGraphqlDgs[] {
    const regions: IRegionGraphqlDgs[] = regionsToCheck.filter(isPresent);
    if (regions.length > 0) {
      const regionCollectionIdentifiers = regionCollection.map(regionItem => getRegionGraphqlDgsIdentifier(regionItem)!);
      const regionsToAdd = regions.filter(regionItem => {
        const regionIdentifier = getRegionGraphqlDgsIdentifier(regionItem);
        if (regionIdentifier == null || regionCollectionIdentifiers.includes(regionIdentifier)) {
          return false;
        }
        regionCollectionIdentifiers.push(regionIdentifier);
        return true;
      });
      return [...regionsToAdd, ...regionCollection];
    }
    return regionCollection;
  }
}
