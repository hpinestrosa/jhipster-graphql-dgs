import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRegionGraphqlDgs, RegionGraphqlDgs } from '../region-graphql-dgs.model';

import { RegionGraphqlDgsService } from './region-graphql-dgs.service';

describe('RegionGraphqlDgs Service', () => {
  let service: RegionGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: IRegionGraphqlDgs;
  let expectedResult: IRegionGraphqlDgs | IRegionGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RegionGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      regionName: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a RegionGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RegionGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RegionGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          regionName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RegionGraphqlDgs', () => {
      const patchObject = Object.assign({}, new RegionGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RegionGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          regionName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a RegionGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRegionGraphqlDgsToCollectionIfMissing', () => {
      it('should add a RegionGraphqlDgs to an empty array', () => {
        const region: IRegionGraphqlDgs = { id: 123 };
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing([], region);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should not add a RegionGraphqlDgs to an array that contains it', () => {
        const region: IRegionGraphqlDgs = { id: 123 };
        const regionCollection: IRegionGraphqlDgs[] = [
          {
            ...region,
          },
          { id: 456 },
        ];
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RegionGraphqlDgs to an array that doesn't contain it", () => {
        const region: IRegionGraphqlDgs = { id: 123 };
        const regionCollection: IRegionGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing(regionCollection, region);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
      });

      it('should add only unique RegionGraphqlDgs to an array', () => {
        const regionArray: IRegionGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 52888 }];
        const regionCollection: IRegionGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing(regionCollection, ...regionArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const region: IRegionGraphqlDgs = { id: 123 };
        const region2: IRegionGraphqlDgs = { id: 456 };
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing([], region, region2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(region);
        expect(expectedResult).toContain(region2);
      });

      it('should accept null and undefined values', () => {
        const region: IRegionGraphqlDgs = { id: 123 };
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing([], null, region, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(region);
      });

      it('should return initial array if no RegionGraphqlDgs is added', () => {
        const regionCollection: IRegionGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addRegionGraphqlDgsToCollectionIfMissing(regionCollection, undefined, null);
        expect(expectedResult).toEqual(regionCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
