import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IContentTypeGraphqlDgs, ContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from '../service/content-type-graphql-dgs.service';

@Component({
  selector: 'jhi-content-type-graphql-dgs-update',
  templateUrl: './content-type-graphql-dgs-update.component.html',
})
export class ContentTypeGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    contentTypeName: [null, [Validators.required, Validators.maxLength(100)]],
  });

  constructor(
    protected contentTypeService: ContentTypeGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentType }) => {
      this.updateForm(contentType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contentType = this.createFromForm();
    if (contentType.id !== undefined) {
      this.subscribeToSaveResponse(this.contentTypeService.update(contentType));
    } else {
      this.subscribeToSaveResponse(this.contentTypeService.create(contentType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContentTypeGraphqlDgs>>): void {
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

  protected updateForm(contentType: IContentTypeGraphqlDgs): void {
    this.editForm.patchValue({
      id: contentType.id,
      contentTypeName: contentType.contentTypeName,
    });
  }

  protected createFromForm(): IContentTypeGraphqlDgs {
    return {
      ...new ContentTypeGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      contentTypeName: this.editForm.get(['contentTypeName'])!.value,
    };
  }
}
