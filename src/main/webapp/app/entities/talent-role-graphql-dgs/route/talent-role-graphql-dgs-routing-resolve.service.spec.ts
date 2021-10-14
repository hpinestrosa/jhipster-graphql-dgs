jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITalentRoleGraphqlDgs, TalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';

import { TalentRoleGraphqlDgsRoutingResolveService } from './talent-role-graphql-dgs-routing-resolve.service';

describe('TalentRoleGraphqlDgs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TalentRoleGraphqlDgsRoutingResolveService;
  let service: TalentRoleGraphqlDgsService;
  let resultTalentRoleGraphqlDgs: ITalentRoleGraphqlDgs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TalentRoleGraphqlDgsRoutingResolveService);
    service = TestBed.inject(TalentRoleGraphqlDgsService);
    resultTalentRoleGraphqlDgs = undefined;
  });

  describe('resolve', () => {
    it('should return ITalentRoleGraphqlDgs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentRoleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTalentRoleGraphqlDgs).toEqual({ id: 123 });
    });

    it('should return new ITalentRoleGraphqlDgs if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentRoleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTalentRoleGraphqlDgs).toEqual(new TalentRoleGraphqlDgs());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TalentRoleGraphqlDgs })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTalentRoleGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTalentRoleGraphqlDgs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
