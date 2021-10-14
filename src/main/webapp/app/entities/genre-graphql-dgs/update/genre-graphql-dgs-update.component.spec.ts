jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';
import { IGenreGraphqlDgs, GenreGraphqlDgs } from '../genre-graphql-dgs.model';

import { GenreGraphqlDgsUpdateComponent } from './genre-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('GenreGraphqlDgs Management Update Component', () => {
    let comp: GenreGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<GenreGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let genreService: GenreGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [GenreGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(GenreGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenreGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      genreService = TestBed.inject(GenreGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const genre: IGenreGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ genre });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(genre));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<GenreGraphqlDgs>>();
        const genre = { id: 123 };
        jest.spyOn(genreService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ genre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: genre }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(genreService.update).toHaveBeenCalledWith(genre);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<GenreGraphqlDgs>>();
        const genre = new GenreGraphqlDgs();
        jest.spyOn(genreService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ genre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: genre }));
        saveSubject.complete();

        // THEN
        expect(genreService.create).toHaveBeenCalledWith(genre);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<GenreGraphqlDgs>>();
        const genre = { id: 123 };
        jest.spyOn(genreService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ genre });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(genreService.update).toHaveBeenCalledWith(genre);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
