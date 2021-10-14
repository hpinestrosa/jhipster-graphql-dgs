import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITitleGenreGraphqlDgs, TitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';
import { TitleGenreGraphqlDgsService } from '../service/title-genre-graphql-dgs.service';
import { IGenreGraphqlDgs } from 'app/entities/genre-graphql-dgs/genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from 'app/entities/genre-graphql-dgs/service/genre-graphql-dgs.service';
import { ITitleGraphqlDgs } from 'app/entities/title-graphql-dgs/title-graphql-dgs.model';
import { TitleGraphqlDgsService } from 'app/entities/title-graphql-dgs/service/title-graphql-dgs.service';

@Component({
  selector: 'jhi-title-genre-graphql-dgs-update',
  templateUrl: './title-genre-graphql-dgs-update.component.html',
})
export class TitleGenreGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  genresSharedCollection: IGenreGraphqlDgs[] = [];
  titlesSharedCollection: ITitleGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    ord: [null, [Validators.required]],
    genre: [],
    title: [],
  });

  constructor(
    protected titleGenreService: TitleGenreGraphqlDgsService,
    protected genreService: GenreGraphqlDgsService,
    protected titleService: TitleGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleGenre }) => {
      this.updateForm(titleGenre);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titleGenre = this.createFromForm();
    if (titleGenre.id !== undefined) {
      this.subscribeToSaveResponse(this.titleGenreService.update(titleGenre));
    } else {
      this.subscribeToSaveResponse(this.titleGenreService.create(titleGenre));
    }
  }

  trackGenreGraphqlDgsById(index: number, item: IGenreGraphqlDgs): number {
    return item.id!;
  }

  trackTitleGraphqlDgsById(index: number, item: ITitleGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleGenreGraphqlDgs>>): void {
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

  protected updateForm(titleGenre: ITitleGenreGraphqlDgs): void {
    this.editForm.patchValue({
      id: titleGenre.id,
      ord: titleGenre.ord,
      genre: titleGenre.genre,
      title: titleGenre.title,
    });

    this.genresSharedCollection = this.genreService.addGenreGraphqlDgsToCollectionIfMissing(this.genresSharedCollection, titleGenre.genre);
    this.titlesSharedCollection = this.titleService.addTitleGraphqlDgsToCollectionIfMissing(this.titlesSharedCollection, titleGenre.title);
  }

  protected loadRelationshipsOptions(): void {
    this.genreService
      .query()
      .pipe(map((res: HttpResponse<IGenreGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((genres: IGenreGraphqlDgs[]) =>
          this.genreService.addGenreGraphqlDgsToCollectionIfMissing(genres, this.editForm.get('genre')!.value)
        )
      )
      .subscribe((genres: IGenreGraphqlDgs[]) => (this.genresSharedCollection = genres));

    this.titleService
      .query()
      .pipe(map((res: HttpResponse<ITitleGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((titles: ITitleGraphqlDgs[]) =>
          this.titleService.addTitleGraphqlDgsToCollectionIfMissing(titles, this.editForm.get('title')!.value)
        )
      )
      .subscribe((titles: ITitleGraphqlDgs[]) => (this.titlesSharedCollection = titles));
  }

  protected createFromForm(): ITitleGenreGraphqlDgs {
    return {
      ...new TitleGenreGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      ord: this.editForm.get(['ord'])!.value,
      genre: this.editForm.get(['genre'])!.value,
      title: this.editForm.get(['title'])!.value,
    };
  }
}
