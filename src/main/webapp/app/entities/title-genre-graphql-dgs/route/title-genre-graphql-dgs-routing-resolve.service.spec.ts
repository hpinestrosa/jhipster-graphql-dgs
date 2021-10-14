jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITitleGenreGraphqlDgs, TitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';

import { TitleGenreGraphqlDgsRoutingResolveService } from './title-genre-graphql-dgs-routing-resolve.service';

describe('TitleGenreGraphqlDgs routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: TitleGenreGraphqlDgsRoutingResolveService;
  let service: TitleGenreGraphqlDgsService;
  let resultTitleGenreGraphqlDgs: ITitleGenreGraphqlDgs | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [Router, ActivatedRouteSnapshot],
    });
    mockRouter = TestBed.inject(Router);
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
    routingResolveService = TestBed.inject(TitleGenreGraphqlDgsRoutingResolveService);
    service = TestBed.inject(TitleGenreGraphqlDgsService);
    resultTitleGenreGraphqlDgs = undefined;
  });

  describe('resolve', () => {
    it('should return ITitleGenreGraphqlDgs returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGenreGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitleGenreGraphqlDgs).toEqual({ id: 123 });
    });

    it('should return new ITitleGenreGraphqlDgs if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGenreGraphqlDgs = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultTitleGenreGraphqlDgs).toEqual(new TitleGenreGraphqlDgs());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as TitleGenreGraphqlDgs })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultTitleGenreGraphqlDgs = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultTitleGenreGraphqlDgs).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
