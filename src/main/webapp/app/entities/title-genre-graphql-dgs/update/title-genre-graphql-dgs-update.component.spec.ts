jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';
import { ITitleGenreGraphqlDgs, TitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { IGenreGraphqlDgs } from 'app/entities/genre-graphql-dgs/genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from 'app/entities/genre-graphql-dgs/service/genre-graphql-dgs.service';
import { ITitleGraphqlDgs } from 'app/entities/title-graphql-dgs/title-graphql-dgs.model';
import { TitleGraphqlDgsService } from 'app/entities/title-graphql-dgs/service/title-graphql-dgs.service';

import { TitleGenreGraphqlDgsUpdateComponent } from './title-genre-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleGenreGraphqlDgs Management Update Component', () => {
    let comp: TitleGenreGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleGenreGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleGenreService: TitleGenreGraphqlDgsService;
    let genreService: GenreGraphqlDgsService;
    let titleService: TitleGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleGenreGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleGenreGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleGenreGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleGenreService = TestBed.inject(TitleGenreGraphqlDgsService);
      genreService = TestBed.inject(GenreGraphqlDgsService);
      titleService = TestBed.inject(TitleGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call GenreGraphqlDgs query and add missing value', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 456 };
        const genre: IGenreGraphqlDgs = { id: 68788 };
        titleGenre.genre = genre;

        const genreCollection: IGenreGraphqlDgs[] = [{ id: 51263 }];
        jest.spyOn(genreService, 'query').mockReturnValue(of(new HttpResponse({ body: genreCollection })));
        const additionalGenreGraphqlDgs = [genre];
        const expectedCollection: IGenreGraphqlDgs[] = [...additionalGenreGraphqlDgs, ...genreCollection];
        jest.spyOn(genreService, 'addGenreGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        expect(genreService.query).toHaveBeenCalled();
        expect(genreService.addGenreGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(genreCollection, ...additionalGenreGraphqlDgs);
        expect(comp.genresSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TitleGraphqlDgs query and add missing value', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 456 };
        const title: ITitleGraphqlDgs = { id: 38047 };
        titleGenre.title = title;

        const titleCollection: ITitleGraphqlDgs[] = [{ id: 35614 }];
        jest.spyOn(titleService, 'query').mockReturnValue(of(new HttpResponse({ body: titleCollection })));
        const additionalTitleGraphqlDgs = [title];
        const expectedCollection: ITitleGraphqlDgs[] = [...additionalTitleGraphqlDgs, ...titleCollection];
        jest.spyOn(titleService, 'addTitleGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        expect(titleService.query).toHaveBeenCalled();
        expect(titleService.addTitleGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(titleCollection, ...additionalTitleGraphqlDgs);
        expect(comp.titlesSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const titleGenre: ITitleGenreGraphqlDgs = { id: 456 };
        const genre: IGenreGraphqlDgs = { id: 86217 };
        titleGenre.genre = genre;
        const title: ITitleGraphqlDgs = { id: 1619 };
        titleGenre.title = title;

        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titleGenre));
        expect(comp.genresSharedCollection).toContain(genre);
        expect(comp.titlesSharedCollection).toContain(title);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGenreGraphqlDgs>>();
        const titleGenre = { id: 123 };
        jest.spyOn(titleGenreService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleGenre }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleGenreService.update).toHaveBeenCalledWith(titleGenre);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGenreGraphqlDgs>>();
        const titleGenre = new TitleGenreGraphqlDgs();
        jest.spyOn(titleGenreService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleGenre }));
        saveSubject.complete();

        // THEN
        expect(titleGenreService.create).toHaveBeenCalledWith(titleGenre);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGenreGraphqlDgs>>();
        const titleGenre = { id: 123 };
        jest.spyOn(titleGenreService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleGenre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleGenreService.update).toHaveBeenCalledWith(titleGenre);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackGenreGraphqlDgsById', () => {
        it('Should return tracked GenreGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackGenreGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackTitleGraphqlDgsById', () => {
        it('Should return tracked TitleGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTitleGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
