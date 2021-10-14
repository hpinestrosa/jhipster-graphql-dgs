jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';
import { IRoleGraphqlDgs, RoleGraphqlDgs } from '../role-graphql-dgs.model';

import { RoleGraphqlDgsUpdateComponent } from './role-graphql-dgs-update.component';

describe('Component Tests', () => {
  describe('RoleGraphqlDgs Management Update Component', () => {
    let comp: RoleGraphqlDgsUpdateComponent;
    let fixture: ComponentFixture<RoleGraphqlDgsUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let roleService: RoleGraphqlDgsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RoleGraphqlDgsUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(RoleGraphqlDgsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RoleGraphqlDgsUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      roleService = TestBed.inject(RoleGraphqlDgsService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const role: IRoleGraphqlDgs = { id: 456 };

        activatedRoute.data = of({ role });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(role));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RoleGraphqlDgs>>();
        const role = { id: 123 };
        jest.spyOn(roleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ role });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: role }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(roleService.update).toHaveBeenCalledWith(role);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RoleGraphqlDgs>>();
        const role = new RoleGraphqlDgs();
        jest.spyOn(roleService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ role });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: role }));
        saveSubject.complete();

        // THEN
        expect(roleService.create).toHaveBeenCalledWith(role);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<RoleGraphqlDgs>>();
        const role = { id: 123 };
        jest.spyOn(roleService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ role });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(roleService.update).toHaveBeenCalledWith(role);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
