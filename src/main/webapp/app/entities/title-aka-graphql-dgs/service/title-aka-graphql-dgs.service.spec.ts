import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleAkaGraphqlDgs, TitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';

import { TitleAkaGraphqlDgsService } from './title-aka-graphql-dgs.service';

describe('TitleAkaGraphqlDgs Service', () => {
  let service: TitleAkaGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleAkaGraphqlDgs;
  let expectedResult: ITitleAkaGraphqlDgs | ITitleAkaGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleAkaGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      akaTitle: 'AAAAAAA',
      additionalAttrs: 'AAAAAAA',
      isOriginalTitle: false,
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

    it('should create a TitleAkaGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleAkaGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleAkaGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          akaTitle: 'BBBBBB',
          additionalAttrs: 'BBBBBB',
          isOriginalTitle: true,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleAkaGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          akaTitle: 'BBBBBB',
          isOriginalTitle: true,
        },
        new TitleAkaGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleAkaGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          akaTitle: 'BBBBBB',
          additionalAttrs: 'BBBBBB',
          isOriginalTitle: true,
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

    it('should delete a TitleAkaGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleAkaGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleAkaGraphqlDgs to an empty array', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing([], titleAka);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleAka);
      });

      it('should not add a TitleAkaGraphqlDgs to an array that contains it', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 123 };
        const titleAkaCollection: ITitleAkaGraphqlDgs[] = [
          {
            ...titleAka,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing(titleAkaCollection, titleAka);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleAkaGraphqlDgs to an array that doesn't contain it", () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 123 };
        const titleAkaCollection: ITitleAkaGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing(titleAkaCollection, titleAka);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleAka);
      });

      it('should add only unique TitleAkaGraphqlDgs to an array', () => {
        const titleAkaArray: ITitleAkaGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 76080 }];
        const titleAkaCollection: ITitleAkaGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing(titleAkaCollection, ...titleAkaArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 123 };
        const titleAka2: ITitleAkaGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing([], titleAka, titleAka2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleAka);
        expect(expectedResult).toContain(titleAka2);
      });

      it('should accept null and undefined values', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing([], null, titleAka, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleAka);
      });

      it('should return initial array if no TitleAkaGraphqlDgs is added', () => {
        const titleAkaCollection: ITitleAkaGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleAkaGraphqlDgsToCollectionIfMissing(titleAkaCollection, undefined, null);
        expect(expectedResult).toEqual(titleAkaCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
