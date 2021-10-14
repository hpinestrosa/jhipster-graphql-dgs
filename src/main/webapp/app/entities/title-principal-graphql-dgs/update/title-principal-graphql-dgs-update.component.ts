import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITitlePrincipalGraphqlDgs, TitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';
import { TitlePrincipalGraphqlDgsService } from '../service/title-principal-graphql-dgs.service';

@Component({
  selector: 'jhi-title-principal-graphql-dgs-update',
  templateUrl: './title-principal-graphql-dgs-update.component.html',
})
export class TitlePrincipalGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    category: [null, [Validators.required]],
    job: [null, [Validators.maxLength(1000)]],
    roleNames: [null, [Validators.maxLength(1000)]],
  });

  constructor(
    protected titlePrincipalService: TitlePrincipalGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titlePrincipal }) => {
      this.updateForm(titlePrincipal);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titlePrincipal = this.createFromForm();
    if (titlePrincipal.id !== undefined) {
      this.subscribeToSaveResponse(this.titlePrincipalService.update(titlePrincipal));
    } else {
      this.subscribeToSaveResponse(this.titlePrincipalService.create(titlePrincipal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitlePrincipalGraphqlDgs>>): void {
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

  protected updateForm(titlePrincipal: ITitlePrincipalGraphqlDgs): void {
    this.editForm.patchValue({
      id: titlePrincipal.id,
      category: titlePrincipal.category,
      job: titlePrincipal.job,
      roleNames: titlePrincipal.roleNames,
    });
  }

  protected createFromForm(): ITitlePrincipalGraphqlDgs {
    return {
      ...new TitlePrincipalGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      category: this.editForm.get(['category'])!.value,
      job: this.editForm.get(['job'])!.value,
      roleNames: this.editForm.get(['roleNames'])!.value,
    };
  }
}
