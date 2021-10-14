import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ICategoryGraphqlDgs, CategoryGraphqlDgs } from '../category-graphql-dgs.model';
import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';

@Component({
  selector: 'jhi-category-graphql-dgs-update',
  templateUrl: './category-graphql-dgs-update.component.html',
})
export class CategoryGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    categoryName: [null, [Validators.required, Validators.maxLength(100)]],
  });

  constructor(protected categoryService: CategoryGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ category }) => {
      this.updateForm(category);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoryGraphqlDgs>>): void {
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

  protected updateForm(category: ICategoryGraphqlDgs): void {
    this.editForm.patchValue({
      id: category.id,
      categoryName: category.categoryName,
    });
  }

  protected createFromForm(): ICategoryGraphqlDgs {
    return {
      ...new CategoryGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      categoryName: this.editForm.get(['categoryName'])!.value,
    };
  }
}
