import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IGenreGraphqlDgs, GenreGraphqlDgs } from '../genre-graphql-dgs.model';

import { GenreGraphqlDgsService } from './genre-graphql-dgs.service';

describe('GenreGraphqlDgs Service', () => {
  let service: GenreGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: IGenreGraphqlDgs;
  let expectedResult: IGenreGraphqlDgs | IGenreGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(GenreGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      genreName: 'AAAAAAA',
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

    it('should create a GenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new GenreGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a GenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          genreName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a GenreGraphqlDgs', () => {
      const patchObject = Object.assign({}, new GenreGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of GenreGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          genreName: 'BBBBBB',
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

    it('should delete a GenreGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addGenreGraphqlDgsToCollectionIfMissing', () => {
      it('should add a GenreGraphqlDgs to an empty array', () => {
        const genre: IGenreGraphqlDgs = { id: 123 };
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing([], genre);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genre);
      });

      it('should not add a GenreGraphqlDgs to an array that contains it', () => {
        const genre: IGenreGraphqlDgs = { id: 123 };
        const genreCollection: IGenreGraphqlDgs[] = [
          {
            ...genre,
          },
          { id: 456 },
        ];
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing(genreCollection, genre);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a GenreGraphqlDgs to an array that doesn't contain it", () => {
        const genre: IGenreGraphqlDgs = { id: 123 };
        const genreCollection: IGenreGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing(genreCollection, genre);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genre);
      });

      it('should add only unique GenreGraphqlDgs to an array', () => {
        const genreArray: IGenreGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 78929 }];
        const genreCollection: IGenreGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing(genreCollection, ...genreArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const genre: IGenreGraphqlDgs = { id: 123 };
        const genre2: IGenreGraphqlDgs = { id: 456 };
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing([], genre, genre2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(genre);
        expect(expectedResult).toContain(genre2);
      });

      it('should accept null and undefined values', () => {
        const genre: IGenreGraphqlDgs = { id: 123 };
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing([], null, genre, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(genre);
      });

      it('should return initial array if no GenreGraphqlDgs is added', () => {
        const genreCollection: IGenreGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addGenreGraphqlDgsToCollectionIfMissing(genreCollection, undefined, null);
        expect(expectedResult).toEqual(genreCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
