jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITalentTitleGraphqlDgs, TalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';

import { TalentTitleGraphqlDgsRoutingResolveService } from './talent-title-graphql-dgs-routing-resolve.service';

describe('TalentTitleGraphqlDgs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TalentTitleGraphqlDgsRoutingResolveService;
  let service: TalentTitleGraphqlDgsService;
  let resultTalentTitleGraphqlDgs: ITalentTitleGraphqlDgs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TalentTitleGraphqlDgsRoutingResolveService);
    service = TestBed.inject(TalentTitleGraphqlDgsService);
    resultTalentTitleGraphqlDgs = undefined;
  });

  describe('resolve', () => {
    it('should return ITalentTitleGraphqlDgs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTalentTitleGraphqlDgs).toEqual({ id: 123 });
    });

    it('should return new ITalentTitleGraphqlDgs if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTalentTitleGraphqlDgs).toEqual(new TalentTitleGraphqlDgs());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TalentTitleGraphqlDgs })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentTitleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTalentTitleGraphqlDgs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
