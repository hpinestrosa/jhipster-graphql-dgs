jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITitlePrincipalGraphqlDgs, TitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';
import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

import { TitlePrincipalGraphqlDgsRoutingResolveService } from './title-principal-graphql-dgs-routing-resolve.service';

describe('TitlePrincipalGraphqlDgs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TitlePrincipalGraphqlDgsRoutingResolveService;
  let service: TitlePrincipalGraphqlDgsService;
  let resultTitlePrincipalGraphqlDgs: ITitlePrincipalGraphqlDgs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TitlePrincipalGraphqlDgsRoutingResolveService);
    service = TestBed.inject(TitlePrincipalGraphqlDgsService);
    resultTitlePrincipalGraphqlDgs = undefined;
  });

  describe('resolve', () => {
    it('should return ITitlePrincipalGraphqlDgs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitlePrincipalGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitlePrincipalGraphqlDgs).toEqual({ id: 123 });
    });

    it('should return new ITitlePrincipalGraphqlDgs if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitlePrincipalGraphqlDgs = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTitlePrincipalGraphqlDgs).toEqual(new TitlePrincipalGraphqlDgs());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TitlePrincipalGraphqlDgs })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitlePrincipalGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitlePrincipalGraphqlDgs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
