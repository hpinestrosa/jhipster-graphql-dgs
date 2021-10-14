import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IContentTypeGraphqlDgs, ContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';

import { ContentTypeGraphqlDgsService } from './content-type-graphql-dgs.service';

describe('ContentTypeGraphqlDgs Service', () => {
  let service: ContentTypeGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: IContentTypeGraphqlDgs;
  let expectedResult: IContentTypeGraphqlDgs | IContentTypeGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ContentTypeGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      contentTypeName: 'AAAAAAA',
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

    it('should create a ContentTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new ContentTypeGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ContentTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          contentTypeName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ContentTypeGraphqlDgs', () => {
      const patchObject = Object.assign({}, new ContentTypeGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ContentTypeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          contentTypeName: 'BBBBBB',
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

    it('should delete a ContentTypeGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addContentTypeGraphqlDgsToCollectionIfMissing', () => {
      it('should add a ContentTypeGraphqlDgs to an empty array', () => {
        const contentType: IContentTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing([], contentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contentType);
      });

      it('should not add a ContentTypeGraphqlDgs to an array that contains it', () => {
        const contentType: IContentTypeGraphqlDgs = { id: 123 };
        const contentTypeCollection: IContentTypeGraphqlDgs[] = [
          {
            ...contentType,
          },
          { id: 456 },
        ];
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing(contentTypeCollection, contentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ContentTypeGraphqlDgs to an array that doesn't contain it", () => {
        const contentType: IContentTypeGraphqlDgs = { id: 123 };
        const contentTypeCollection: IContentTypeGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing(contentTypeCollection, contentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contentType);
      });

      it('should add only unique ContentTypeGraphqlDgs to an array', () => {
        const contentTypeArray: IContentTypeGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 84873 }];
        const contentTypeCollection: IContentTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing(contentTypeCollection, ...contentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const contentType: IContentTypeGraphqlDgs = { id: 123 };
        const contentType2: IContentTypeGraphqlDgs = { id: 456 };
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing([], contentType, contentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(contentType);
        expect(expectedResult).toContain(contentType2);
      });

      it('should accept null and undefined values', () => {
        const contentType: IContentTypeGraphqlDgs = { id: 123 };
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing([], null, contentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(contentType);
      });

      it('should return initial array if no ContentTypeGraphqlDgs is added', () => {
        const contentTypeCollection: IContentTypeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addContentTypeGraphqlDgsToCollectionIfMissing(contentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(contentTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
