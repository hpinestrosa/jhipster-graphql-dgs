import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITalentRoleGraphqlDgs, TalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';
import { IRoleGraphqlDgs } from 'app/entities/role-graphql-dgs/role-graphql-dgs.model';
import { RoleGraphqlDgsService } from 'app/entities/role-graphql-dgs/service/role-graphql-dgs.service';
import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from 'app/entities/talent-graphql-dgs/service/talent-graphql-dgs.service';

@Component({
  selector: 'jhi-talent-role-graphql-dgs-update',
  templateUrl: './talent-role-graphql-dgs-update.component.html',
})
export class TalentRoleGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  rolesSharedCollection: IRoleGraphqlDgs[] = [];
  talentsSharedCollection: ITalentGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    ord: [null, [Validators.required]],
    role: [],
    talent: [],
  });

  constructor(
    protected talentRoleService: TalentRoleGraphqlDgsService,
    protected roleService: RoleGraphqlDgsService,
    protected talentService: TalentGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talentRole }) => {
      this.updateForm(talentRole);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const talentRole = this.createFromForm();
    if (talentRole.id !== undefined) {
      this.subscribeToSaveResponse(this.talentRoleService.update(talentRole));
    } else {
      this.subscribeToSaveResponse(this.talentRoleService.create(talentRole));
    }
  }

  trackRoleGraphqlDgsById(index: number, item: IRoleGraphqlDgs): number {
    return item.id!;
  }

  trackTalentGraphqlDgsById(index: number, item: ITalentGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalentRoleGraphqlDgs>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(talentRole: ITalentRoleGraphqlDgs): void {
    this.editForm.patchValue({
      id: talentRole.id,
      ord: talentRole.ord,
      role: talentRole.role,
      talent: talentRole.talent,
    });

    this.rolesSharedCollection = this.roleService.addRoleGraphqlDgsToCollectionIfMissing(this.rolesSharedCollection, talentRole.role);
    this.talentsSharedCollection = this.talentService.addTalentGraphqlDgsToCollectionIfMissing(
      this.talentsSharedCollection,
      talentRole.talent
    );
  }

  protected loadRelationshipsOptions(): void {
    this.roleService
      .query()
      .pipe(map((res: HttpResponse<IRoleGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((roles: IRoleGraphqlDgs[]) => this.roleService.addRoleGraphqlDgsToCollectionIfMissing(roles, this.editForm.get('role')!.value))
      )
      .subscribe((roles: IRoleGraphqlDgs[]) => (this.rolesSharedCollection = roles));

    this.talentService
      .query()
      .pipe(map((res: HttpResponse<ITalentGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((talents: ITalentGraphqlDgs[]) =>
          this.talentService.addTalentGraphqlDgsToCollectionIfMissing(talents, this.editForm.get('talent')!.value)
        )
      )
      .subscribe((talents: ITalentGraphqlDgs[]) => (this.talentsSharedCollection = talents));
  }

  protected createFromForm(): ITalentRoleGraphqlDgs {
    return {
      ...new TalentRoleGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      ord: this.editForm.get(['ord'])!.value,
      role: this.editForm.get(['role'])!.value,
      talent: this.editForm.get(['talent'])!.value,
    };
  }
}
