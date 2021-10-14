jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';
import { IContentTypeGraphqlDgs, ContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';

import { ContentTypeGraphqlDgsUpdateComponent } from './content-type-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('ContentTypeGraphqlDgs Management Update Component', () => {
    let comp: ContentTypeGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<ContentTypeGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let contentTypeService: ContentTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ContentTypeGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ContentTypeGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContentTypeGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      contentTypeService = TestBed.inject(ContentTypeGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const contentType: IContentTypeGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ contentType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(contentType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ContentTypeGraphqlDgs>>();
        const contentType = { id: 123 };
        jest.spyOn(contentTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ contentType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: contentType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(contentTypeService.update).toHaveBeenCalledWith(contentType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ContentTypeGraphqlDgs>>();
        const contentType = new ContentTypeGraphqlDgs();
        jest.spyOn(contentTypeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ contentType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: contentType }));
        saveSubject.complete();

        // THEN
        expect(contentTypeService.create).toHaveBeenCalledWith(contentType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ContentTypeGraphqlDgs>>();
        const contentType = { id: 123 };
        jest.spyOn(contentTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ contentType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(contentTypeService.update).toHaveBeenCalledWith(contentType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
