import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILanguageGraphqlDgs, LanguageGraphqlDgs } from '../language-graphql-dgs.model';

import { LanguageGraphqlDgsService } from './language-graphql-dgs.service';

describe('LanguageGraphqlDgs Service', () => {
  let service: LanguageGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ILanguageGraphqlDgs;
  let expectedResult: ILanguageGraphqlDgs | ILanguageGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(LanguageGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      languageName: 'AAAAAAA',
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

    it('should create a LanguageGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new LanguageGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LanguageGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          languageName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LanguageGraphqlDgs', () => {
      const patchObject = Object.assign({}, new LanguageGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LanguageGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          languageName: 'BBBBBB',
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

    it('should delete a LanguageGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addLanguageGraphqlDgsToCollectionIfMissing', () => {
      it('should add a LanguageGraphqlDgs to an empty array', () => {
        const language: ILanguageGraphqlDgs = { id: 123 };
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing([], language);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(language);
      });

      it('should not add a LanguageGraphqlDgs to an array that contains it', () => {
        const language: ILanguageGraphqlDgs = { id: 123 };
        const languageCollection: ILanguageGraphqlDgs[] = [
          {
            ...language,
          },
          { id: 456 },
        ];
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing(languageCollection, language);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LanguageGraphqlDgs to an array that doesn't contain it", () => {
        const language: ILanguageGraphqlDgs = { id: 123 };
        const languageCollection: ILanguageGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing(languageCollection, language);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(language);
      });

      it('should add only unique LanguageGraphqlDgs to an array', () => {
        const languageArray: ILanguageGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 53473 }];
        const languageCollection: ILanguageGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing(languageCollection, ...languageArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const language: ILanguageGraphqlDgs = { id: 123 };
        const language2: ILanguageGraphqlDgs = { id: 456 };
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing([], language, language2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(language);
        expect(expectedResult).toContain(language2);
      });

      it('should accept null and undefined values', () => {
        const language: ILanguageGraphqlDgs = { id: 123 };
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing([], null, language, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(language);
      });

      it('should return initial array if no LanguageGraphqlDgs is added', () => {
        const languageCollection: ILanguageGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addLanguageGraphqlDgsToCollectionIfMissing(languageCollection, undefined, null);
        expect(expectedResult).toEqual(languageCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
