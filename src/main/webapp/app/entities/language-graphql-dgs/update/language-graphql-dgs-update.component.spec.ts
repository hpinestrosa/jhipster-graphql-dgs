jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';
import { ILanguageGraphqlDgs, LanguageGraphqlDgs } from '../language-graphql-dgs.model';

import { LanguageGraphqlDgsUpdateComponent } from './language-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('LanguageGraphqlDgs Management Update Component', () => {
    let comp: LanguageGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<LanguageGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let languageService: LanguageGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LanguageGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LanguageGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LanguageGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      languageService = TestBed.inject(LanguageGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const language: ILanguageGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ language });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(language));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LanguageGraphqlDgs>>();
        const language = { id: 123 };
        jest.spyOn(languageService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ language });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: language }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(languageService.update).toHaveBeenCalledWith(language);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LanguageGraphqlDgs>>();
        const language = new LanguageGraphqlDgs();
        jest.spyOn(languageService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ language });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: language }));
        saveSubject.complete();

        // THEN
        expect(languageService.create).toHaveBeenCalledWith(language);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<LanguageGraphqlDgs>>();
        const language = { id: 123 };
        jest.spyOn(languageService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ language });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(languageService.update).toHaveBeenCalledWith(language);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
