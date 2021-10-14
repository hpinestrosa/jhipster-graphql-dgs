jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';
import { ITalentRoleGraphqlDgs, TalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { IRoleGraphqlDgs } from 'app/entities/role-graphql-dgs/role-graphql-dgs.model';
import { RoleGraphqlDgsService } from 'app/entities/role-graphql-dgs/service/role-graphql-dgs.service';
import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from 'app/entities/talent-graphql-dgs/service/talent-graphql-dgs.service';

import { TalentRoleGraphqlDgsUpdateComponent } from './talent-role-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('TalentRoleGraphqlDgs Management Update Component', () => {
    let comp: TalentRoleGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<TalentRoleGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let talentRoleService: TalentRoleGraphqlDgsService;
    let roleService: RoleGraphqlDgsService;
    let talentService: TalentGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TalentRoleGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(TalentRoleGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TalentRoleGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      talentRoleService = TestBed.inject(TalentRoleGraphqlDgsService);
      roleService = TestBed.inject(RoleGraphqlDgsService);
      talentService = TestBed.inject(TalentGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call RoleGraphqlDgs query and add missing value', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 456 };
        const role: IRoleGraphqlDgs = { id: 12198 };
        talentRole.role = role;

        const roleCollection: IRoleGraphqlDgs[] = [{ id: 74830 }];
        jest.spyOn(roleService, 'query').mockReturnValue(of(new HttpResponse({ body: roleCollection })));
        const additionalRoleGraphqlDgs = [role];
        const expectedCollection: IRoleGraphqlDgs[] = [...additionalRoleGraphqlDgs, ...roleCollection];
        jest.spyOn(roleService, 'addRoleGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        expect(roleService.query).toHaveBeenCalled();
        expect(roleService.addRoleGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(roleCollection, ...additionalRoleGraphqlDgs);
        expect(comp.rolesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call TalentGraphqlDgs query and add missing value', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 456 };
        const talent: ITalentGraphqlDgs = { id: 2736 };
        talentRole.talent = talent;

        const talentCollection: ITalentGraphqlDgs[] = [{ id: 60805 }];
        jest.spyOn(talentService, 'query').mockReturnValue(of(new HttpResponse({ body: talentCollection })));
        const additionalTalentGraphqlDgs = [talent];
        const expectedCollection: ITalentGraphqlDgs[] = [...additionalTalentGraphqlDgs, ...talentCollection];
        jest.spyOn(talentService, 'addTalentGraphqlDgsToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        expect(talentService.query).toHaveBeenCalled();
        expect(talentService.addTalentGraphqlDgsToCollectionIfMissing).toHaveBeenCalledWith(
          talentCollection,
          ...additionalTalentGraphqlDgs
        );
        expect(comp.talentsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const talentRole: ITalentRoleGraphqlDgs = { id: 456 };
        const role: IRoleGraphqlDgs = { id: 27963 };
        talentRole.role = role;
        const talent: ITalentGraphqlDgs = { id: 69676 };
        talentRole.talent = talent;

        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(talentRole));
        expect(comp.rolesSharedCollection).toContain(role);
        expect(comp.talentsSharedCollection).toContain(talent);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentRoleGraphqlDgs>>();
        const talentRole = { id: 123 };
        jest.spyOn(talentRoleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talentRole }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(talentRoleService.update).toHaveBeenCalledWith(talentRole);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentRoleGraphqlDgs>>();
        const talentRole = new TalentRoleGraphqlDgs();
        jest.spyOn(talentRoleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: talentRole }));
        saveSubject.complete();

        // THEN
        expect(talentRoleService.create).toHaveBeenCalledWith(talentRole);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<TalentRoleGraphqlDgs>>();
        const talentRole = { id: 123 };
        jest.spyOn(talentRoleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ talentRole });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(talentRoleService.update).toHaveBeenCalledWith(talentRole);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackRoleGraphqlDgsById', () => {
        it('Should return tracked RoleGraphqlDgs primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackRoleGraphqlDgsById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

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
