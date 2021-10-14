import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITitleGraphqlDgs, TitleGraphqlDgs } from '../title-graphql-dgs.model';
import { TitleGraphqlDgsService } from '../service/title-graphql-dgs.service';
import { IContentTypeGraphqlDgs } from 'app/entities/content-type-graphql-dgs/content-type-graphql-dgs.model';
import { ContentTypeGraphqlDgsService } from 'app/entities/content-type-graphql-dgs/service/content-type-graphql-dgs.service';

@Component({
  selector: 'jhi-title-graphql-dgs-update',
  templateUrl: './title-graphql-dgs-update.component.html',
})
export class TitleGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  contentTypesCollection: IContentTypeGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    primaryTitle: [null, [Validators.required, Validators.maxLength(500)]],
    originalTitle: [null, [Validators.maxLength(500)]],
    isAdult: [],
    startYear: [],
    endYear: [],
    runtimeMinutes: [],
    contentType: [],
  });

  constructor(
    protected titleService: TitleGraphqlDgsService,
    protected contentTypeService: ContentTypeGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ title }) => {
      this.updateForm(title);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const title = this.createFromForm();
    if (title.id !== undefined) {
      this.subscribeToSaveResponse(this.titleService.update(title));
    } else {
      this.subscribeToSaveResponse(this.titleService.create(title));
    }
  }

  trackContentTypeGraphqlDgsById(index: number, item: IContentTypeGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleGraphqlDgs>>): void {
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

  protected updateForm(title: ITitleGraphqlDgs): void {
    this.editForm.patchValue({
      id: title.id,
      primaryTitle: title.primaryTitle,
      originalTitle: title.originalTitle,
      isAdult: title.isAdult,
      startYear: title.startYear,
      endYear: title.endYear,
      runtimeMinutes: title.runtimeMinutes,
      contentType: title.contentType,
    });

    this.contentTypesCollection = this.contentTypeService.addContentTypeGraphqlDgsToCollectionIfMissing(
      this.contentTypesCollection,
      title.contentType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.contentTypeService
      .query({ filter: 'title-is-null' })
      .pipe(map((res: HttpResponse<IContentTypeGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((contentTypes: IContentTypeGraphqlDgs[]) =>
          this.contentTypeService.addContentTypeGraphqlDgsToCollectionIfMissing(contentTypes, this.editForm.get('contentType')!.value)
        )
      )
      .subscribe((contentTypes: IContentTypeGraphqlDgs[]) => (this.contentTypesCollection = contentTypes));
  }

  protected createFromForm(): ITitleGraphqlDgs {
    return {
      ...new TitleGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      primaryTitle: this.editForm.get(['primaryTitle'])!.value,
      originalTitle: this.editForm.get(['originalTitle'])!.value,
      isAdult: this.editForm.get(['isAdult'])!.value,
      startYear: this.editForm.get(['startYear'])!.value,
      endYear: this.editForm.get(['endYear'])!.value,
      runtimeMinutes: this.editForm.get(['runtimeMinutes'])!.value,
      contentType: this.editForm.get(['contentType'])!.value,
    };
  }
}
