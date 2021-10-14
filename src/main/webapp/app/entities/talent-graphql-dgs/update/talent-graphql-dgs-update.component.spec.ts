jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';
import { ITalentGraphqlDgs, TalentGraphqlDgs } from '../talent-graphql-dgs.model';

import { TalentGraphqlDgsUpdateComponent } from './talent-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TalentGraphqlDgs Management Update Component', () => {
    let comp: TalentGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TalentGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let talentService: TalentGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TalentGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      talentService = TestBed.inject(TalentGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const talent: ITalentGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ talent });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(talent));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentGraphqlDgs>>();
        const talent = { id: 123 };
        jest.spyOn(talentService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talent });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talent }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(talentService.update).toHaveBeenCalledWith(talent);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentGraphqlDgs>>();
        const talent = new TalentGraphqlDgs();
        jest.spyOn(talentService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talent });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talent }));
        saveSubject.complete();

        // THEN
        expect(talentService.create).toHaveBeenCalledWith(talent);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentGraphqlDgs>>();
        const talent = { id: 123 };
        jest.spyOn(talentService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talent });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(talentService.update).toHaveBeenCalledWith(talent);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
