import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleAkaTitleTypeGraphqlDgs, TitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';

import { TitleAkaTitleTypeGraphqlDgsService } from './title-aka-title-type-graphql-dgs.service';

describe('TitleAkaTitleTypeGraphqlDgs Service', () => {
  let service: TitleAkaTitleTypeGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleAkaTitleTypeGraphqlDgs;
  let expectedResult: ITitleAkaTitleTypeGraphqlDgs | ITitleAkaTitleTypeGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleAkaTitleTypeGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
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

    it('should create a TitleAkaTitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleAkaTitleTypeGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleAkaTitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleAkaTitleTypeGraphqlDgs', () => {
      const patchObject = Object.assign({}, new TitleAkaTitleTypeGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleAkaTitleTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    it('should delete a TitleAkaTitleTypeGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleAkaTitleTypeGraphqlDgs to an empty array', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing([], titleAkaTitleType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleAkaTitleType);
      });

      it('should not add a TitleAkaTitleTypeGraphqlDgs to an array that contains it', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 123 };
        const titleAkaTitleTypeCollection: ITitleAkaTitleTypeGraphqlDgs[] = [
          {
            ...titleAkaTitleType,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing(titleAkaTitleTypeCollection, titleAkaTitleType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleAkaTitleTypeGraphqlDgs to an array that doesn't contain it", () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 123 };
        const titleAkaTitleTypeCollection: ITitleAkaTitleTypeGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing(titleAkaTitleTypeCollection, titleAkaTitleType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleAkaTitleType);
      });

      it('should add only unique TitleAkaTitleTypeGraphqlDgs to an array', () => {
        const titleAkaTitleTypeArray: ITitleAkaTitleTypeGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 91407 }];
        const titleAkaTitleTypeCollection: ITitleAkaTitleTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing(
          titleAkaTitleTypeCollection,
          ...titleAkaTitleTypeArray
        );
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 123 };
        const titleAkaTitleType2: ITitleAkaTitleTypeGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing([], titleAkaTitleType, titleAkaTitleType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleAkaTitleType);
        expect(expectedResult).toContain(titleAkaTitleType2);
      });

      it('should accept null and undefined values', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing([], null, titleAkaTitleType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleAkaTitleType);
      });

      it('should return initial array if no TitleAkaTitleTypeGraphqlDgs is added', () => {
        const titleAkaTitleTypeCollection: ITitleAkaTitleTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleAkaTitleTypeGraphqlDgsToCollectionIfMissing(titleAkaTitleTypeCollection, undefined, null);
        expect(expectedResult).toEqual(titleAkaTitleTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
