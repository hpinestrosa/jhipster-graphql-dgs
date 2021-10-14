jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';
import { ITitlePrincipalGraphqlDgs, TitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';

import { TitlePrincipalGraphqlDgsUpdateComponent } from './title-principal-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TitlePrincipalGraphqlDgs Management Update Component', () => {
    let comp: TitlePrincipalGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TitlePrincipalGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let titlePrincipalService: TitlePrincipalGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TitlePrincipalGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TitlePrincipalGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TitlePrincipalGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      titlePrincipalService = TestBed.inject(TitlePrincipalGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const titlePrincipal: ITitlePrincipalGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ titlePrincipal });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(titlePrincipal));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitlePrincipalGraphqlDgs>>();
        const titlePrincipal = { id: 123 };
        jest.spyOn(titlePrincipalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titlePrincipal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titlePrincipal }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(titlePrincipalService.update).toHaveBeenCalledWith(titlePrincipal);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitlePrincipalGraphqlDgs>>();
        const titlePrincipal = new TitlePrincipalGraphqlDgs();
        jest.spyOn(titlePrincipalService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titlePrincipal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: titlePrincipal }));
        saveSubject.complete();

        // THEN
        expect(titlePrincipalService.create).toHaveBeenCalledWith(titlePrincipal);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TitlePrincipalGraphqlDgs>>();
        const titlePrincipal = { id: 123 };
        jest.spyOn(titlePrincipalService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ titlePrincipal });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(titlePrincipalService.update).toHaveBeenCalledWith(titlePrincipal);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
