import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleGraphqlDgs, TitleGraphqlDgs } from '../title-graphql-dgs.model';

import { TitleGraphqlDgsService } from './title-graphql-dgs.service';

describe('TitleGraphqlDgs Service', () => {
  let service: TitleGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleGraphqlDgs;
  let expectedResult: ITitleGraphqlDgs | ITitleGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      primaryTitle: 'AAAAAAA',
      originalTitle: 'AAAAAAA',
      isAdult: false,
      startYear: 0,
      endYear: 0,
      runtimeMinutes: 0,
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

    it('should create a TitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          primaryTitle: 'BBBBBB',
          originalTitle: 'BBBBBB',
          isAdult: true,
          startYear: 1,
          endYear: 1,
          runtimeMinutes: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          originalTitle: 'BBBBBB',
          isAdult: true,
          runtimeMinutes: 1,
        },
        new TitleGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          primaryTitle: 'BBBBBB',
          originalTitle: 'BBBBBB',
          isAdult: true,
          startYear: 1,
          endYear: 1,
          runtimeMinutes: 1,
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

    it('should delete a TitleGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleGraphqlDgs to an empty array', () => {
        const title: ITitleGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing([], title);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(title);
      });

      it('should not add a TitleGraphqlDgs to an array that contains it', () => {
        const title: ITitleGraphqlDgs = { id: 123 };
        const titleCollection: ITitleGraphqlDgs[] = [
          {
            ...title,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing(titleCollection, title);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleGraphqlDgs to an array that doesn't contain it", () => {
        const title: ITitleGraphqlDgs = { id: 123 };
        const titleCollection: ITitleGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing(titleCollection, title);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(title);
      });

      it('should add only unique TitleGraphqlDgs to an array', () => {
        const titleArray: ITitleGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 85576 }];
        const titleCollection: ITitleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing(titleCollection, ...titleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const title: ITitleGraphqlDgs = { id: 123 };
        const title2: ITitleGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing([], title, title2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(title);
        expect(expectedResult).toContain(title2);
      });

      it('should accept null and undefined values', () => {
        const title: ITitleGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing([], null, title, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(title);
      });

      it('should return initial array if no TitleGraphqlDgs is added', () => {
        const titleCollection: ITitleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleGraphqlDgsToCollectionIfMissing(titleCollection, undefined, null);
        expect(expectedResult).toEqual(titleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
