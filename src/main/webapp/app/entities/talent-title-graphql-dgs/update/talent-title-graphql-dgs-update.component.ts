import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITalentTitleGraphqlDgs, TalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';
import { ITalentGraphqlDgs } from 'app/entities/talent-graphql-dgs/talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from 'app/entities/talent-graphql-dgs/service/talent-graphql-dgs.service';

@Component({
  selector: 'jhi-talent-title-graphql-dgs-update',
  templateUrl: './talent-title-graphql-dgs-update.component.html',
})
export class TalentTitleGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  talentsCollection: ITalentGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required, Validators.maxLength(20)]],
    talent: [],
  });

  constructor(
    protected talentTitleService: TalentTitleGraphqlDgsService,
    protected talentService: TalentGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talentTitle }) => {
      this.updateForm(talentTitle);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const talentTitle = this.createFromForm();
    if (talentTitle.id !== undefined) {
      this.subscribeToSaveResponse(this.talentTitleService.update(talentTitle));
    } else {
      this.subscribeToSaveResponse(this.talentTitleService.create(talentTitle));
    }
  }

  trackTalentGraphqlDgsById(index: number, item: ITalentGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITalentTitleGraphqlDgs>>): void {
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

  protected updateForm(talentTitle: ITalentTitleGraphqlDgs): void {
    this.editForm.patchValue({
      id: talentTitle.id,
      title: talentTitle.title,
      talent: talentTitle.talent,
    });

    this.talentsCollection = this.talentService.addTalentGraphqlDgsToCollectionIfMissing(this.talentsCollection, talentTitle.talent);
  }

  protected loadRelationshipsOptions(): void {
    this.talentService
      .query({ filter: 'talenttitle-is-null' })
      .pipe(map((res: HttpResponse<ITalentGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((talents: ITalentGraphqlDgs[]) =>
          this.talentService.addTalentGraphqlDgsToCollectionIfMissing(talents, this.editForm.get('talent')!.value)
        )
      )
      .subscribe((talents: ITalentGraphqlDgs[]) => (this.talentsCollection = talents));
  }

  protected createFromForm(): ITalentTitleGraphqlDgs {
    return {
      ...new TalentTitleGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      talent: this.editForm.get(['talent'])!.value,
    };
  }
}
