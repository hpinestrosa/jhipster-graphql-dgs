jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';
import { ITitleAkaGraphqlDgs, TitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';
import { IRegionGraphqlDgs } from 'app/entities/region-graphql-dgs/region-graphql-dgs.model';
import { RegionGraphqlDgsService } from 'app/entities/region-graphql-dgs/service/region-graphql-dgs.service';
import { ILanguageGraphqlDgs } from 'app/entities/language-graphql-dgs/language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from 'app/entities/language-graphql-dgs/service/language-graphql-dgs.service';

import { TitleAkaGraphqlDgsUpdateComponent } from './title-aka-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleAkaGraphqlDgs Management Update Component', () => {
    let comp: TitleAkaGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleAkaGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleAkaService: TitleAkaGraphqlDgsService;
    let regionService: RegionGraphqlDgsService;
    let languageService: LanguageGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleAkaGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleAkaGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleAkaGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleAkaService = TestBed.inject(TitleAkaGraphqlDgsService);
      regionService = TestBed.inject(RegionGraphqlDgsService);
      languageService = TestBed.inject(LanguageGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call region query and add missing value', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 456 };
        const region: IRegionGraphqlDgs = { id: 3605 };
        titleAka.region = region;

        const regionCollection: IRegionGraphqlDgs[] = [{ id: 25936 }];
        jest.spyOn(regionService, 'query').mockReturnValue(of(new HttpResponse({ body: regionCollection })));
        const expectedCollection: IRegionGraphqlDgs[] = [region, ...regionCollection];
        jest.spyOn(regionService, 'addRegionGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        expect(regionService.query).toHaveBeenCalled();
        expect(regionService.addRegionGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(regionCollection, region);
        expect(comp.regionsCollection).toEqual(expectedCollection);
      });

      it('Should call language query and add missing value', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 456 };
        const language: ILanguageGraphqlDgs = { id: 93131 };
        titleAka.language = language;

        const languageCollection: ILanguageGraphqlDgs[] = [{ id: 91250 }];
        jest.spyOn(languageService, 'query').mockReturnValue(of(new HttpResponse({ body: languageCollection })));
        const expectedCollection: ILanguageGraphqlDgs[] = [language, ...languageCollection];
        jest.spyOn(languageService, 'addLanguageGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        expect(languageService.query).toHaveBeenCalled();
        expect(languageService.addLanguageGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(languageCollection, language);
        expect(comp.languagesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const titleAka: ITitleAkaGraphqlDgs = { id: 456 };
        const region: IRegionGraphqlDgs = { id: 4994 };
        titleAka.region = region;
        const language: ILanguageGraphqlDgs = { id: 4149 };
        titleAka.language = language;

        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titleAka));
        expect(comp.regionsCollection).toContain(region);
        expect(comp.languagesCollection).toContain(language);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaGraphqlDgs>>();
        const titleAka = { id: 123 };
        jest.spyOn(titleAkaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleAka }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleAkaService.update).toHaveBeenCalledWith(titleAka);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaGraphqlDgs>>();
        const titleAka = new TitleAkaGraphqlDgs();
        jest.spyOn(titleAkaService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleAka }));
        saveSubject.complete();

        // THEN
        expect(titleAkaService.create).toHaveBeenCalledWith(titleAka);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaGraphqlDgs>>();
        const titleAka = { id: 123 };
        jest.spyOn(titleAkaService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAka });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleAkaService.update).toHaveBeenCalledWith(titleAka);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackRegionGraphqlDgsById', () => {
        it('Should return tracked RegionGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackRegionGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackLanguageGraphqlDgsById', () => {
        it('Should return tracked LanguageGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackLanguageGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
