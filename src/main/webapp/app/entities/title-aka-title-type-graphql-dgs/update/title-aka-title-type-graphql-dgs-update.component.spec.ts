jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';
import { ITitleAkaTitleTypeGraphqlDgs, TitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';
import { ITitleTypeGraphqlDgs } from 'app/entities/title-type-graphql-dgs/title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from 'app/entities/title-type-graphql-dgs/service/title-type-graphql-dgs.service';

import { TitleAkaTitleTypeGraphqlDgsUpdateComponent } from './title-aka-title-type-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleAkaTitleTypeGraphqlDgs Management Update Component', () => {
    let comp: TitleAkaTitleTypeGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleAkaTitleTypeGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleAkaTitleTypeService: TitleAkaTitleTypeGraphqlDgsService;
    let titleTypeService: TitleTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleAkaTitleTypeGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleAkaTitleTypeGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleAkaTitleTypeGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleAkaTitleTypeService = TestBed.inject(TitleAkaTitleTypeGraphqlDgsService);
      titleTypeService = TestBed.inject(TitleTypeGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call titleType query and add missing value', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 456 };
        const titleType: ITitleTypeGraphqlDgs = { id: 90647 };
        titleAkaTitleType.titleType = titleType;

        const titleTypeCollection: ITitleTypeGraphqlDgs[] = [{ id: 42931 }];
        jest.spyOn(titleTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: titleTypeCollection })));
        const expectedCollection: ITitleTypeGraphqlDgs[] = [titleType, ...titleTypeCollection];
        jest.spyOn(titleTypeService, 'addTitleTypeGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ titleAkaTitleType });
        comp.ngOnInit();

        expect(titleTypeService.query).toHaveBeenCalled();
        expect(titleTypeService.addTitleTypeGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(titleTypeCollection, titleType);
        expect(comp.titleTypesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs = { id: 456 };
        const titleType: ITitleTypeGraphqlDgs = { id: 21625 };
        titleAkaTitleType.titleType = titleType;

        activatedRoute.data = of({ titleAkaTitleType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titleAkaTitleType));
        expect(comp.titleTypesCollection).toContain(titleType);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaTitleTypeGraphqlDgs>>();
        const titleAkaTitleType = { id: 123 };
        jest.spyOn(titleAkaTitleTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAkaTitleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleAkaTitleType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleAkaTitleTypeService.update).toHaveBeenCalledWith(titleAkaTitleType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaTitleTypeGraphqlDgs>>();
        const titleAkaTitleType = new TitleAkaTitleTypeGraphqlDgs();
        jest.spyOn(titleAkaTitleTypeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAkaTitleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleAkaTitleType }));
        saveSubject.complete();

        // THEN
        expect(titleAkaTitleTypeService.create).toHaveBeenCalledWith(titleAkaTitleType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleAkaTitleTypeGraphqlDgs>>();
        const titleAkaTitleType = { id: 123 };
        jest.spyOn(titleAkaTitleTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleAkaTitleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleAkaTitleTypeService.update).toHaveBeenCalledWith(titleAkaTitleType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTitleTypeGraphqlDgsById', () => {
        it('Should return tracked TitleTypeGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTitleTypeGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
