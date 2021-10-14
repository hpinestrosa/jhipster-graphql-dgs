import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITitleEpisodeGraphqlDgs, TitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';
import { TitleEpisodeGraphqlDgsService } from '../service/title-episode-graphql-dgs.service';

@Component({
  selector: 'jhi-title-episode-graphql-dgs-update',
  templateUrl: './title-episode-graphql-dgs-update.component.html',
})
export class TitleEpisodeGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    parentTitle: [null, [Validators.maxLength(20)]],
    seasonNumber: [],
    episodeNumber: [],
  });

  constructor(
    protected titleEpisodeService: TitleEpisodeGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleEpisode }) => {
      this.updateForm(titleEpisode);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titleEpisode = this.createFromForm();
    if (titleEpisode.id !== undefined) {
      this.subscribeToSaveResponse(this.titleEpisodeService.update(titleEpisode));
    } else {
      this.subscribeToSaveResponse(this.titleEpisodeService.create(titleEpisode));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleEpisodeGraphqlDgs>>): void {
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

  protected updateForm(titleEpisode: ITitleEpisodeGraphqlDgs): void {
    this.editForm.patchValue({
      id: titleEpisode.id,
      parentTitle: titleEpisode.parentTitle,
      seasonNumber: titleEpisode.seasonNumber,
      episodeNumber: titleEpisode.episodeNumber,
    });
  }

  protected createFromForm(): ITitleEpisodeGraphqlDgs {
    return {
      ...new TitleEpisodeGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      parentTitle: this.editForm.get(['parentTitle'])!.value,
      seasonNumber: this.editForm.get(['seasonNumber'])!.value,
      episodeNumber: this.editForm.get(['episodeNumber'])!.value,
    };
  }
}
