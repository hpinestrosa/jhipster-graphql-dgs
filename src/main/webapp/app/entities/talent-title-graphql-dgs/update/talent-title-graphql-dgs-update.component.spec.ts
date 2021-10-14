jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';
import { ITalentTitleGraphqlDgs, TalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from 'app/entities/talent-graphql-dgs/service/talent-graphql-dgs.service';

import { TalentTitleGraphqlDgsUpdateComponent } from './talent-title-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TalentTitleGraphqlDgs Management Update Component', () => {
    let comp: TalentTitleGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TalentTitleGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let talentTitleService: TalentTitleGraphqlDgsService;
    let talentService: TalentGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentTitleGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TalentTitleGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentTitleGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      talentTitleService = TestBed.inject(TalentTitleGraphqlDgsService);
      talentService = TestBed.inject(TalentGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call talent query and add missing value', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 456 };
        const talent: ITalentGraphqlDgs = { id: 4421 };
        talentTitle.talent = talent;

        const talentCollection: ITalentGraphqlDgs[] = [{ id: 46769 }];
        jest.spyOn(talentService, 'query').mockReturnValue(of(new HttpResponse({ body: talentCollection })));
        const expectedCollection: ITalentGraphqlDgs[] = [talent, ...talentCollection];
        jest.spyOn(talentService, 'addTalentGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ talentTitle });
        comp.ngOnInit();

        expect(talentService.query).toHaveBeenCalled();
        expect(talentService.addTalentGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(talentCollection, talent);
        expect(comp.talentsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const talentTitle: ITalentTitleGraphqlDgs = { id: 456 };
        const talent: ITalentGraphqlDgs = { id: 19776 };
        talentTitle.talent = talent;

        activatedRoute.data = of({ talentTitle });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(talentTitle));
        expect(comp.talentsCollection).toContain(talent);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentTitleGraphqlDgs>>();
        const talentTitle = { id: 123 };
        jest.spyOn(talentTitleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentTitle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talentTitle }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(talentTitleService.update).toHaveBeenCalledWith(talentTitle);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentTitleGraphqlDgs>>();
        const talentTitle = new TalentTitleGraphqlDgs();
        jest.spyOn(talentTitleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentTitle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talentTitle }));
        saveSubject.complete();

        // THEN
        expect(talentTitleService.create).toHaveBeenCalledWith(talentTitle);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentTitleGraphqlDgs>>();
        const talentTitle = { id: 123 };
        jest.spyOn(talentTitleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentTitle });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(talentTitleService.update).toHaveBeenCalledWith(talentTitle);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackTalentGraphqlDgsById', () => {
        it('Should return tracked TalentGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackTalentGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
