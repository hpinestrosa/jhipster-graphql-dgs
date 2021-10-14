jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITitleGraphqlDgs, TitleGraphqlDgs } from '../title-graphql-dgs.model';
import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';

import { TitleGraphqlDgsRoutingResolveService } from './title-graphql-dgs-routing-resolve.service';

describe('TitleGraphqlDgs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TitleGraphqlDgsRoutingResolveService;
  let service: TitleGraphqlDgsService;
  let resultTitleGraphqlDgs: ITitleGraphqlDgs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TitleGraphqlDgsRoutingResolveService);
    service = TestBed.inject(TitleGraphqlDgsService);
    resultTitleGraphqlDgs = undefined;
  });

  describe('resolve', () => {
    it('should return ITitleGraphqlDgs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitleGraphqlDgs).toEqual({ id: 123 });
    });

    it('should return new ITitleGraphqlDgs if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTitleGraphqlDgs).toEqual(new TitleGraphqlDgs());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TitleGraphqlDgs })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitleGraphqlDgs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
