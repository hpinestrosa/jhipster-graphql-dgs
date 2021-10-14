import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRoleGraphqlDgs, RoleGraphqlDgs } from '../role-graphql-dgs.model';

import { RoleGraphqlDgsService } from './role-graphql-dgs.service';

describe('RoleGraphqlDgs Service', () => {
  let service: RoleGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: IRoleGraphqlDgs;
  let expectedResult: IRoleGraphqlDgs | IRoleGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RoleGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      roleName: 'AAAAAAA',
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

    it('should create a RoleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new RoleGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RoleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          roleName: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RoleGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          roleName: 'BBBBBB',
        },
        new RoleGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RoleGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          roleName: 'BBBBBB',
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

    it('should delete a RoleGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addRoleGraphqlDgsToCollectionIfMissing', () => {
      it('should add a RoleGraphqlDgs to an empty array', () => {
        const role: IRoleGraphqlDgs = { id: 123 };
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing([], role);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(role);
      });

      it('should not add a RoleGraphqlDgs to an array that contains it', () => {
        const role: IRoleGraphqlDgs = { id: 123 };
        const roleCollection: IRoleGraphqlDgs[] = [
          {
            ...role,
          },
          { id: 456 },
        ];
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing(roleCollection, role);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RoleGraphqlDgs to an array that doesn't contain it", () => {
        const role: IRoleGraphqlDgs = { id: 123 };
        const roleCollection: IRoleGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing(roleCollection, role);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(role);
      });

      it('should add only unique RoleGraphqlDgs to an array', () => {
        const roleArray: IRoleGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 97391 }];
        const roleCollection: IRoleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing(roleCollection, ...roleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const role: IRoleGraphqlDgs = { id: 123 };
        const role2: IRoleGraphqlDgs = { id: 456 };
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing([], role, role2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(role);
        expect(expectedResult).toContain(role2);
      });

      it('should accept null and undefined values', () => {
        const role: IRoleGraphqlDgs = { id: 123 };
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing([], null, role, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(role);
      });

      it('should return initial array if no RoleGraphqlDgs is added', () => {
        const roleCollection: IRoleGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addRoleGraphqlDgsToCollectionIfMissing(roleCollection, undefined, null);
        expect(expectedResult).toEqual(roleCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
