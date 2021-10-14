import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITalentRoleGraphqlDgs, TalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';

import { TalentRoleGraphqlDgsService } from './talent-role-graphql-dgs.service';

describe('TalentRoleGraphqlDgs Service', () => {
  let service: TalentRoleGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITalentRoleGraphqlDgs;
  let expectedResult: ITalentRoleGraphqlDgs | ITalentRoleGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TalentRoleGraphqlDgsService);
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

    it('should create a TalentRoleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TalentRoleGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TalentRoleGraphqlDgs', () => {
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

    it('should partial update a TalentRoleGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          ord: 1,
        },
        new TalentRoleGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TalentRoleGraphqlDgs', () => {
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

    it('should delete a TalentRoleGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTalentRoleGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TalentRoleGraphqlDgs to an empty array', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing([], talentRole);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talentRole);
      });

      it('should not add a TalentRoleGraphqlDgs to an array that contains it', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 123 };
        const talentRoleCollection: ITalentRoleGraphqlDgs[] = [
          {
            ...talentRole,
          },
          { id: 456 },
        ];
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing(talentRoleCollection, talentRole);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TalentRoleGraphqlDgs to an array that doesn't contain it", () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 123 };
        const talentRoleCollection: ITalentRoleGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing(talentRoleCollection, talentRole);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talentRole);
      });

      it('should add only unique TalentRoleGraphqlDgs to an array', () => {
        const talentRoleArray: ITalentRoleGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 39135 }];
        const talentRoleCollection: ITalentRoleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing(talentRoleCollection, ...talentRoleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 123 };
        const talentRole2: ITalentRoleGraphqlDgs = { id: 456 };
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing([], talentRole, talentRole2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talentRole);
        expect(expectedResult).toContain(talentRole2);
      });

      it('should accept null and undefined values', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing([], null, talentRole, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talentRole);
      });

      it('should return initial array if no TalentRoleGraphqlDgs is added', () => {
        const talentRoleCollection: ITalentRoleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentRoleGraphqlDgsToCollectionIfMissing(talentRoleCollection, undefined, null);
        expect(expectedResult).toEqual(talentRoleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
