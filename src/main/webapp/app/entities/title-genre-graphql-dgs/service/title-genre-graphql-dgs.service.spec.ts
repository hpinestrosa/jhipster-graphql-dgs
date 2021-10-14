import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleGenreGraphqlDgs, TitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';

import { TitleGenreGraphqlDgsService } from './title-genre-graphql-dgs.service';

describe('TitleGenreGraphqlDgs Service', () => {
  let service: TitleGenreGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleGenreGraphqlDgs;
  let expectedResult: ITitleGenreGraphqlDgs | ITitleGenreGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleGenreGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      ord: 0,
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

    it('should create a TitleGenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleGenreGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleGenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          ord: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleGenreGraphqlDgs', () => {
      const patchObject = Object.assign({}, new TitleGenreGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleGenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          ord: 1,
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

    it('should delete a TitleGenreGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleGenreGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleGenreGraphqlDgs to an empty array', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing([], titleGenre);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleGenre);
      });

      it('should not add a TitleGenreGraphqlDgs to an array that contains it', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 123 };
        const titleGenreCollection: ITitleGenreGraphqlDgs[] = [
          {
            ...titleGenre,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing(titleGenreCollection, titleGenre);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleGenreGraphqlDgs to an array that doesn't contain it", () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 123 };
        const titleGenreCollection: ITitleGenreGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing(titleGenreCollection, titleGenre);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleGenre);
      });

      it('should add only unique TitleGenreGraphqlDgs to an array', () => {
        const titleGenreArray: ITitleGenreGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 20676 }];
        const titleGenreCollection: ITitleGenreGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing(titleGenreCollection, ...titleGenreArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 123 };
        const titleGenre2: ITitleGenreGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing([], titleGenre, titleGenre2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleGenre);
        expect(expectedResult).toContain(titleGenre2);
      });

      it('should accept null and undefined values', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing([], null, titleGenre, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleGenre);
      });

      it('should return initial array if no TitleGenreGraphqlDgs is added', () => {
        const titleGenreCollection: ITitleGenreGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleGenreGraphqlDgsToCollectionIfMissing(titleGenreCollection, undefined, null);
        expect(expectedResult).toEqual(titleGenreCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
