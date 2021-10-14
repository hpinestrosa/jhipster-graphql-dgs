import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ILanguageGraphqlDgs, LanguageGraphqlDgs } from '../language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from '../service/language-graphql-dgs.service';

@Component({
  selector: 'jhi-language-graphql-dgs-update',
  templateUrl: './language-graphql-dgs-update.component.html',
})
export class LanguageGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    languageName: [null, [Validators.maxLength(100)]],
  });

  constructor(protected languageService: LanguageGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.updateForm(language);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const language = this.createFromForm();
    if (language.id !== undefined) {
      this.subscribeToSaveResponse(this.languageService.update(language));
    } else {
      this.subscribeToSaveResponse(this.languageService.create(language));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguageGraphqlDgs>>): void {
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

  protected updateForm(language: ILanguageGraphqlDgs): void {
    this.editForm.patchValue({
      id: language.id,
      languageName: language.languageName,
    });
  }

  protected createFromForm(): ILanguageGraphqlDgs {
    return {
      ...new LanguageGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      languageName: this.editForm.get(['languageName'])!.value,
    };
  }
}
