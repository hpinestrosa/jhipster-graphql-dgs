import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitlePrincipalGraphqlDgs, TitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';

import { TitlePrincipalGraphqlDgsService } from './title-principal-graphql-dgs.service';

describe('TitlePrincipalGraphqlDgs Service', () => {
  let service: TitlePrincipalGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitlePrincipalGraphqlDgs;
  let expectedResult: ITitlePrincipalGraphqlDgs | ITitlePrincipalGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitlePrincipalGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      category: 0,
      job: 'AAAAAAA',
      roleNames: 'AAAAAAA',
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

    it('should create a TitlePrincipalGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitlePrincipalGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitlePrincipalGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          category: 1,
          job: 'BBBBBB',
          roleNames: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitlePrincipalGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          job: 'BBBBBB',
          roleNames: 'BBBBBB',
        },
        new TitlePrincipalGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitlePrincipalGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          category: 1,
          job: 'BBBBBB',
          roleNames: 'BBBBBB',
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

    it('should delete a TitlePrincipalGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitlePrincipalGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitlePrincipalGraphqlDgs to an empty array', () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 123 };
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing([], titlePrincipal);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titlePrincipal);
      });

      it('should not add a TitlePrincipalGraphqlDgs to an array that contains it', () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 123 };
        const titlePrincipalCollection: ITitlePrincipalGraphqlDgs[] = [
          {
            ...titlePrincipal,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing(titlePrincipalCollection, titlePrincipal);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitlePrincipalGraphqlDgs to an array that doesn't contain it", () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 123 };
        const titlePrincipalCollection: ITitlePrincipalGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing(titlePrincipalCollection, titlePrincipal);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titlePrincipal);
      });

      it('should add only unique TitlePrincipalGraphqlDgs to an array', () => {
        const titlePrincipalArray: ITitlePrincipalGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 71505 }];
        const titlePrincipalCollection: ITitlePrincipalGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing(titlePrincipalCollection, ...titlePrincipalArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 123 };
        const titlePrincipal2: ITitlePrincipalGraphqlDgs = { id: 456 };
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing([], titlePrincipal, titlePrincipal2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titlePrincipal);
        expect(expectedResult).toContain(titlePrincipal2);
      });

      it('should accept null and undefined values', () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 123 };
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing([], null, titlePrincipal, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titlePrincipal);
      });

      it('should return initial array if no TitlePrincipalGraphqlDgs is added', () => {
        const titlePrincipalCollection: ITitlePrincipalGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitlePrincipalGraphqlDgsToCollectionIfMissing(titlePrincipalCollection, undefined, null);
        expect(expectedResult).toEqual(titlePrincipalCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
