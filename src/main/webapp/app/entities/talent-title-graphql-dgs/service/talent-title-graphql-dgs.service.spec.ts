import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITalentTitleGraphqlDgs, TalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';

import { TalentTitleGraphqlDgsService } from './talent-title-graphql-dgs.service';

describe('TalentTitleGraphqlDgs Service', () => {
  let service: TalentTitleGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITalentTitleGraphqlDgs;
  let expectedResult: ITalentTitleGraphqlDgs | ITalentTitleGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TalentTitleGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      title: 'AAAAAAA',
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

    it('should create a TalentTitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TalentTitleGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TalentTitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TalentTitleGraphqlDgs', () => {
      const patchObject = Object.assign({}, new TalentTitleGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TalentTitleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          title: 'BBBBBB',
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

    it('should delete a TalentTitleGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTalentTitleGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TalentTitleGraphqlDgs to an empty array', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing([], talentTitle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talentTitle);
      });

      it('should not add a TalentTitleGraphqlDgs to an array that contains it', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 123 };
        const talentTitleCollection: ITalentTitleGraphqlDgs[] = [
          {
            ...talentTitle,
          },
          { id: 456 },
        ];
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing(talentTitleCollection, talentTitle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TalentTitleGraphqlDgs to an array that doesn't contain it", () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 123 };
        const talentTitleCollection: ITalentTitleGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing(talentTitleCollection, talentTitle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talentTitle);
      });

      it('should add only unique TalentTitleGraphqlDgs to an array', () => {
        const talentTitleArray: ITalentTitleGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 85146 }];
        const talentTitleCollection: ITalentTitleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing(talentTitleCollection, ...talentTitleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 123 };
        const talentTitle2: ITalentTitleGraphqlDgs = { id: 456 };
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing([], talentTitle, talentTitle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talentTitle);
        expect(expectedResult).toContain(talentTitle2);
      });

      it('should accept null and undefined values', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing([], null, talentTitle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talentTitle);
      });

      it('should return initial array if no TalentTitleGraphqlDgs is added', () => {
        const talentTitleCollection: ITalentTitleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentTitleGraphqlDgsToCollectionIfMissing(talentTitleCollection, undefined, null);
        expect(expectedResult).toEqual(talentTitleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
