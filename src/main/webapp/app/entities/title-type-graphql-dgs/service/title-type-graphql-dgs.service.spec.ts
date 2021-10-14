import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleTypeGraphqlDgs, TitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';

import { TitleTypeGraphqlDgsService } from './title-type-graphql-dgs.service';

describe('TitleTypeGraphqlDgs Service', () => {
  let service: TitleTypeGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleTypeGraphqlDgs;
  let expectedResult: ITitleTypeGraphqlDgs | ITitleTypeGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleTypeGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      titleTypeName: 'AAAAAAA',
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

    it('should create a TitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleTypeGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          titleTypeName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleTypeGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          titleTypeName: 'BBBBBB',
        },
        new TitleTypeGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          titleTypeName: 'BBBBBB',
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

    it('should delete a TitleTypeGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleTypeGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleTypeGraphqlDgs to an empty array', () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing([], titleType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleType);
      });

      it('should not add a TitleTypeGraphqlDgs to an array that contains it', () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 123 };
        const titleTypeCollection: ITitleTypeGraphqlDgs[] = [
          {
            ...titleType,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing(titleTypeCollection, titleType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleTypeGraphqlDgs to an array that doesn't contain it", () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 123 };
        const titleTypeCollection: ITitleTypeGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing(titleTypeCollection, titleType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleType);
      });

      it('should add only unique TitleTypeGraphqlDgs to an array', () => {
        const titleTypeArray: ITitleTypeGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 31051 }];
        const titleTypeCollection: ITitleTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing(titleTypeCollection, ...titleTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 123 };
        const titleType2: ITitleTypeGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing([], titleType, titleType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleType);
        expect(expectedResult).toContain(titleType2);
      });

      it('should accept null and undefined values', () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing([], null, titleType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleType);
      });

      it('should return initial array if no TitleTypeGraphqlDgs is added', () => {
        const titleTypeCollection: ITitleTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleTypeGraphqlDgsToCollectionIfMissing(titleTypeCollection, undefined, null);
        expect(expectedResult).toEqual(titleTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
