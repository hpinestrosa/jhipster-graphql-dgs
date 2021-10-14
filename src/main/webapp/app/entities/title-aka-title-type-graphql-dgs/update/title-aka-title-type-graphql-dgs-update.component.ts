import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITitleAkaTitleTypeGraphqlDgs, TitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';
import { TitleAkaTitleTypeGraphqlDgsService } from '../service/title-aka-title-type-graphql-dgs.service';
import { ITitleTypeGraphqlDgs } from 'app/entities/title-type-graphql-dgs/title-type-graphql-dgs.model';
import { TitleTypeGraphqlDgsService } from 'app/entities/title-type-graphql-dgs/service/title-type-graphql-dgs.service';

@Component({
  selector: 'jhi-title-aka-title-type-graphql-dgs-update',
  templateUrl: './title-aka-title-type-graphql-dgs-update.component.html',
})
export class TitleAkaTitleTypeGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  titleTypesCollection: ITitleTypeGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    titleType: [],
  });

  constructor(
    protected titleAkaTitleTypeService: TitleAkaTitleTypeGraphqlDgsService,
    protected titleTypeService: TitleTypeGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleAkaTitleType }) => {
      this.updateForm(titleAkaTitleType);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titleAkaTitleType = this.createFromForm();
    if (titleAkaTitleType.id !== undefined) {
      this.subscribeToSaveResponse(this.titleAkaTitleTypeService.update(titleAkaTitleType));
    } else {
      this.subscribeToSaveResponse(this.titleAkaTitleTypeService.create(titleAkaTitleType));
    }
  }

  trackTitleTypeGraphqlDgsById(index: number, item: ITitleTypeGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleAkaTitleTypeGraphqlDgs>>): void {
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

  protected updateForm(titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs): void {
    this.editForm.patchValue({
      id: titleAkaTitleType.id,
      titleType: titleAkaTitleType.titleType,
    });

    this.titleTypesCollection = this.titleTypeService.addTitleTypeGraphqlDgsToCollectionIfMissing(
      this.titleTypesCollection,
      titleAkaTitleType.titleType
    );
  }

  protected loadRelationshipsOptions(): void {
    this.titleTypeService
      .query({ filter: 'titleakatitletype-is-null' })
      .pipe(map((res: HttpResponse<ITitleTypeGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((titleTypes: ITitleTypeGraphqlDgs[]) =>
          this.titleTypeService.addTitleTypeGraphqlDgsToCollectionIfMissing(titleTypes, this.editForm.get('titleType')!.value)
        )
      )
      .subscribe((titleTypes: ITitleTypeGraphqlDgs[]) => (this.titleTypesCollection = titleTypes));
  }

  protected createFromForm(): ITitleAkaTitleTypeGraphqlDgs {
    return {
      ...new TitleAkaTitleTypeGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      titleType: this.editForm.get(['titleType'])!.value,
    };
  }
}
