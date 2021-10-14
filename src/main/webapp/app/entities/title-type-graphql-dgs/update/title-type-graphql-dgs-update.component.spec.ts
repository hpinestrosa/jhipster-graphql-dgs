jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitleTypeGraphqlDgsService } from '../service/title-type-graphql-dgs.service';
import { ITitleTypeGraphqlDgs, TitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';

import { TitleTypeGraphqlDgsUpdateComponent } from './title-type-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitleTypeGraphqlDgs Management Update Component', () => {
    let comp: TitleTypeGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitleTypeGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titleTypeService: TitleTypeGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitleTypeGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitleTypeGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitleTypeGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titleTypeService = TestBed.inject(TitleTypeGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const titleType: ITitleTypeGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ titleType });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titleType));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleTypeGraphqlDgs>>();
        const titleType = { id: 123 };
        jest.spyOn(titleTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleType }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titleTypeService.update).toHaveBeenCalledWith(titleType);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleTypeGraphqlDgs>>();
        const titleType = new TitleTypeGraphqlDgs();
        jest.spyOn(titleTypeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titleType }));
        saveSubject.complete();

        // THEN
        expect(titleTypeService.create).toHaveBeenCalledWith(titleType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitleTypeGraphqlDgs>>();
        const titleType = { id: 123 };
        jest.spyOn(titleTypeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titleType });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titleTypeService.update).toHaveBeenCalledWith(titleType);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
