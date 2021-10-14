import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITitleTypeGraphqlDgs, TitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from '../service/title-type-graphql-dgs.service';

@Component({
  selector: 'jhi-title-type-graphql-dgs-update',
  templateUrl: './title-type-graphql-dgs-update.component.html',
})
export class TitleTypeGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    titleTypeName: [null, [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    protected titleTypeService: TitleTypeGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleType }) => {
      this.updateForm(titleType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titleType = this.createFromForm();
    if (titleType.id !== undefined) {
      this.subscribeToSaveResponse(this.titleTypeService.update(titleType));
    } else {
      this.subscribeToSaveResponse(this.titleTypeService.create(titleType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleTypeGraphqlDgs>>): void {
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

  protected updateForm(titleType: ITitleTypeGraphqlDgs): void {
    this.editForm.patchValue({
      id: titleType.id,
      titleTypeName: titleType.titleTypeName,
    });
  }

  protected createFromForm(): ITitleTypeGraphqlDgs {
    return {
      ...new TitleTypeGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      titleTypeName: this.editForm.get(['titleTypeName'])!.value,
    };
  }
}
