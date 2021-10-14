import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICategoryGraphqlDgs, CategoryGraphqlDgs } from '../category-graphql-dgs.model';

import { CategoryGraphqlDgsService } from './category-graphql-dgs.service';

describe('CategoryGraphqlDgs Service', () => {
  let service: CategoryGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ICategoryGraphqlDgs;
  let expectedResult: ICategoryGraphqlDgs | ICategoryGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CategoryGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      categoryName: 'AAAAAAA',
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

    it('should create a CategoryGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new CategoryGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CategoryGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoryName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CategoryGraphqlDgs', () => {
      const patchObject = Object.assign({}, new CategoryGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CategoryGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          categoryName: 'BBBBBB',
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

    it('should delete a CategoryGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addCategoryGraphqlDgsToCollectionIfMissing', () => {
      it('should add a CategoryGraphqlDgs to an empty array', () => {
        const category: ICategoryGraphqlDgs = { id: 123 };
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing([], category);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(category);
      });

      it('should not add a CategoryGraphqlDgs to an array that contains it', () => {
        const category: ICategoryGraphqlDgs = { id: 123 };
        const categoryCollection: ICategoryGraphqlDgs[] = [
          {
            ...category,
          },
          { id: 456 },
        ];
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing(categoryCollection, category);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CategoryGraphqlDgs to an array that doesn't contain it", () => {
        const category: ICategoryGraphqlDgs = { id: 123 };
        const categoryCollection: ICategoryGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing(categoryCollection, category);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(category);
      });

      it('should add only unique CategoryGraphqlDgs to an array', () => {
        const categoryArray: ICategoryGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 75474 }];
        const categoryCollection: ICategoryGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing(categoryCollection, ...categoryArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const category: ICategoryGraphqlDgs = { id: 123 };
        const category2: ICategoryGraphqlDgs = { id: 456 };
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing([], category, category2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(category);
        expect(expectedResult).toContain(category2);
      });

      it('should accept null and undefined values', () => {
        const category: ICategoryGraphqlDgs = { id: 123 };
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing([], null, category, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(category);
      });

      it('should return initial array if no CategoryGraphqlDgs is added', () => {
        const categoryCollection: ICategoryGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addCategoryGraphqlDgsToCollectionIfMissing(categoryCollection, undefined, null);
        expect(expectedResult).toEqual(categoryCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
