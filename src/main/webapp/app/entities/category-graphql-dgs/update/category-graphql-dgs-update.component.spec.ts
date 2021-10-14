jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';
import { ICategoryGraphqlDgs, CategoryGraphqlDgs } from '../category-graphql-dgs.model';

import { CategoryGraphqlDgsUpdateComponent } from './category-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('CategoryGraphqlDgs Management Update Component', () => {
    let comp: CategoryGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<CategoryGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let categoryService: CategoryGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CategoryGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(CategoryGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CategoryGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      categoryService = TestBed.inject(CategoryGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const category: ICategoryGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ category });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(category));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoryGraphqlDgs>>();
        const category = { id: 123 };
        jest.spyOn(categoryService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: category }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(categoryService.update).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoryGraphqlDgs>>();
        const category = new CategoryGraphqlDgs();
        jest.spyOn(categoryService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: category }));
        saveSubject.complete();

        // THEN
        expect(categoryService.create).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<CategoryGraphqlDgs>>();
        const category = { id: 123 };
        jest.spyOn(categoryService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ category });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(categoryService.update).toHaveBeenCalledWith(category);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
