import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITitleEpisodeGraphqlDgs, TitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';

import { TitleEpisodeGraphqlDgsService } from './title-episode-graphql-dgs.service';

describe('TitleEpisodeGraphqlDgs Service', () => {
  let service: TitleEpisodeGraphqlDgsService;
  let httpMock: HttpTestingController;
  let elemDefault: ITitleEpisodeGraphqlDgs;
  let expectedResult: ITitleEpisodeGraphqlDgs | ITitleEpisodeGraphqlDgs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TitleEpisodeGraphqlDgsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      parentTitle: 'AAAAAAA',
      seasonNumber: 0,
      episodeNumber: 0,
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

    it('should create a TitleEpisodeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new TitleEpisodeGraphqlDgs()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a TitleEpisodeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          parentTitle: 'BBBBBB',
          seasonNumber: 1,
          episodeNumber: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a TitleEpisodeGraphqlDgs', () => {
      const patchObject = Object.assign(
        {
          episodeNumber: 1,
        },
        new TitleEpisodeGraphqlDgs()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of TitleEpisodeGraphqlDgs', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          parentTitle: 'BBBBBB',
          seasonNumber: 1,
          episodeNumber: 1,
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

    it('should delete a TitleEpisodeGraphqlDgs', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTitleEpisodeGraphqlDgsToCollectionIfMissing', () => {
      it('should add a TitleEpisodeGraphqlDgs to an empty array', () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing([], titleEpisode);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleEpisode);
      });

      it('should not add a TitleEpisodeGraphqlDgs to an array that contains it', () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 123 };
        const titleEpisodeCollection: ITitleEpisodeGraphqlDgs[] = [
          {
            ...titleEpisode,
          },
          { id: 456 },
        ];
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing(titleEpisodeCollection, titleEpisode);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a TitleEpisodeGraphqlDgs to an array that doesn't contain it", () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 123 };
        const titleEpisodeCollection: ITitleEpisodeGraphqlDgs[] = [{ id: 456 }];
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing(titleEpisodeCollection, titleEpisode);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleEpisode);
      });

      it('should add only unique TitleEpisodeGraphqlDgs to an array', () => {
        const titleEpisodeArray: ITitleEpisodeGraphqlDgs[] = [{ id: 123 }, { id: 456 }, { id: 22164 }];
        const titleEpisodeCollection: ITitleEpisodeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing(titleEpisodeCollection, ...titleEpisodeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 123 };
        const titleEpisode2: ITitleEpisodeGraphqlDgs = { id: 456 };
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing([], titleEpisode, titleEpisode2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(titleEpisode);
        expect(expectedResult).toContain(titleEpisode2);
      });

      it('should accept null and undefined values', () => {
        const titleEpisode: ITitleEpisodeGraphqlDgs = { id: 123 };
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing([], null, titleEpisode, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(titleEpisode);
      });

      it('should return initial array if no TitleEpisodeGraphqlDgs is added', () => {
        const titleEpisodeCollection: ITitleEpisodeGraphqlDgs[] = [{ id: 123 }];
        expectedResult = service.addTitleEpisodeGraphqlDgsToCollectionIfMissing(titleEpisodeCollection, undefined, null);
        expect(expectedResult).toEqual(titleEpisodeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
