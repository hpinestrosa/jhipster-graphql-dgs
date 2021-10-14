import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRoleGraphqlDgs, RoleGraphqlDgs } from '../role-graphql-dgs.model';
import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';

@Component({
  selector: 'jhi-role-graphql-dgs-update',
  templateUrl: './role-graphql-dgs-update.component.html',
})
export class RoleGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    roleName: [null, [Validators.required, Validators.maxLength(100)]],
  });

  constructor(protected roleService: RoleGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.updateForm(role);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const role = this.createFromForm();
    if (role.id !== undefined) {
      this.subscribeToSaveResponse(this.roleService.update(role));
    } else {
      this.subscribeToSaveResponse(this.roleService.create(role));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRoleGraphqlDgs>>): void {
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

  protected updateForm(role: IRoleGraphqlDgs): void {
    this.editForm.patchValue({
      id: role.id,
      roleName: role.roleName,
    });
  }

  protected createFromForm(): IRoleGraphqlDgs {
    return {
      ...new RoleGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      roleName: this.editForm.get(['roleName'])!.value,
    };
  }
}
