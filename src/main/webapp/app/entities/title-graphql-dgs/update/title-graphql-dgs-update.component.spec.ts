jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';
import { ITitleGraphqlDgs, TitleGraphqlDgs } from '../title-graphql-dgs.model';
import { IContentTypeGraphqlDgs } from 'app/entities/content-type-graphql-dgs/content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from 'app/entities/content-type-graphql-dgs/service/content-type-graphql-dgs.service';

import { TitleGraphqlDgsUpdateComponent } from './title-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleGraphqlDgs Management Update Component', () => {
    let comp: TitleGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleService: TitleGraphqlDgsService;
    let contentTypeService: ContentTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleService = TestBed.inject(TitleGraphqlDgsService);
      contentTypeService = TestBed.inject(ContentTypeGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call contentType query and add missing value', () => {
        const title: ITitleGraphqlDgs = { id: 456 };
        const contentType: IContentTypeGraphqlDgs = { id: 56895 };
        title.contentType = contentType;

        const contentTypeCollection: IContentTypeGraphqlDgs[] = [{ id: 96295 }];
        jest.spyOn(contentTypeService, 'query').mockReturnValue(of(new HttpResponse({ body: contentTypeCollection })));
        const expectedCollection: IContentTypeGraphqlDgs[] = [contentType, ...contentTypeCollection];
        jest.spyOn(contentTypeService, 'addContentTypeGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ title });
        comp.ngOnInit();

        expect(contentTypeService.query).toHaveBeenCalled();
        expect(contentTypeService.addContentTypeGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(contentTypeCollection, contentType);
        expect(comp.contentTypesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const title: ITitleGraphqlDgs = { id: 456 };
        const contentType: IContentTypeGraphqlDgs = { id: 63024 };
        title.contentType = contentType;

        activatedRoute.data = of({ title });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(title));
        expect(comp.contentTypesCollection).toContain(contentType);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGraphqlDgs>>();
        const title = { id: 123 };
        jest.spyOn(titleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ title });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: title }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleService.update).toHaveBeenCalledWith(title);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGraphqlDgs>>();
        const title = new TitleGraphqlDgs();
        jest.spyOn(titleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ title });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: title }));
        saveSubject.complete();

        // THEN
        expect(titleService.create).toHaveBeenCalledWith(title);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleGraphqlDgs>>();
        const title = { id: 123 };
        jest.spyOn(titleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ title });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleService.update).toHaveBeenCalledWith(title);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackContentTypeGraphqlDgsById', () => {
        it('Should return tracked ContentTypeGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackContentTypeGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
