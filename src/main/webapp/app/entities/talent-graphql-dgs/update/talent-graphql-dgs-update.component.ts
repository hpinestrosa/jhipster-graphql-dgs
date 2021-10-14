import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITalentGraphqlDgs, TalentGraphqlDgs } from '../talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';

@Component({
  selector: 'jhi-talent-graphql-dgs-update',
  templateUrl: './talent-graphql-dgs-update.component.html',
})
export class TalentGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    talentName: [null, [Validators.required, Validators.maxLength(500)]],
    birthYear: [],
    deathYear: [],
  });

  constructor(protected talentService: TalentGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talent }) => {
      this.updateForm(talent);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const talent = this.createFromForm();
    if (talent.id !== undefined) {
      this.subscribeToSaveResponse(this.talentService.update(talent));
    } else {
      this.subscribeToSaveResponse(this.talentService.create(talent));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalentGraphqlDgs>>): void {
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

  protected updateForm(talent: ITalentGraphqlDgs): void {
    this.editForm.patchValue({
      id: talent.id,
      talentName: talent.talentName,
      birthYear: talent.birthYear,
      deathYear: talent.deathYear,
    });
  }

  protected createFromForm(): ITalentGraphqlDgs {
    return {
      ...new TalentGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      talentName: this.editForm.get(['talentName'])!.value,
      birthYear: this.editForm.get(['birthYear'])!.value,
      deathYear: this.editForm.get(['deathYear'])!.value,
    };
  }
}
