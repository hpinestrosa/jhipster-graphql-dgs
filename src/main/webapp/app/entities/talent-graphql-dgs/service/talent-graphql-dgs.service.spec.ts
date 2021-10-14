import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITalentGraphqlDgs, TalentGraphqlDgs } from '../talent-graphql-dgs.model';

import { TalentGraphqlDgsService } from './talent-graphql-dgs.service';

describe('TalentGraphqlDgs Service', () => {
  let service: TalentGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITalentGraphqlDgs;
  let expectedResult: ITalentGraphqlDgs | ITalentGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TalentGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      talentName: 'AAAAAAA',
      birthYear: 0,
      deathYear: 0,
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

    it('should create a TalentGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TalentGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TalentGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          talentName: 'BBBBBB',
          birthYear: 1,
          deathYear: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TalentGraphqlDgs', () => {
      const patchObject = Object.assign({}, new TalentGraphqlDgs());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TalentGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          talentName: 'BBBBBB',
          birthYear: 1,
          deathYear: 1,
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

    it('should delete a TalentGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTalentGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TalentGraphqlDgs to an empty array', () => {
        const talent: ITalentGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing([], talent);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talent);
      });

      it('should not add a TalentGraphqlDgs to an array that contains it', () => {
        const talent: ITalentGraphqlDgs = { id: 123 };
        const talentCollection: ITalentGraphqlDgs[] = [
          {
            ...talent,
          },
          { id: 456 },
        ];
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing(talentCollection, talent);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TalentGraphqlDgs to an array that doesn't contain it", () => {
        const talent: ITalentGraphqlDgs = { id: 123 };
        const talentCollection: ITalentGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing(talentCollection, talent);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talent);
      });

      it('should add only unique TalentGraphqlDgs to an array', () => {
        const talentArray: ITalentGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 44966 }];
        const talentCollection: ITalentGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing(talentCollection, ...talentArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const talent: ITalentGraphqlDgs = { id: 123 };
        const talent2: ITalentGraphqlDgs = { id: 456 };
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing([], talent, talent2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(talent);
        expect(expectedResult).toContain(talent2);
      });

      it('should accept null and undefined values', () => {
        const talent: ITalentGraphqlDgs = { id: 123 };
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing([], null, talent, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(talent);
      });

      it('should return initial array if no TalentGraphqlDgs is added', () => {
        const talentCollection: ITalentGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTalentGraphqlDgsToCollectionIfMissing(talentCollection, undefined, null);
        expect(expectedResult).toEqual(talentCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
