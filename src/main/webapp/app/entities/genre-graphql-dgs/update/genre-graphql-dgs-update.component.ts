import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IGenreGraphqlDgs, GenreGraphqlDgs } from '../genre-graphql-dgs.model';
import { GenreGraphqlDgsService } from '../service/genre-graphql-dgs.service';

@Component({
  selector: 'jhi-genre-graphql-dgs-update',
  templateUrl: './genre-graphql-dgs-update.component.html',
})
export class GenreGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    genreName: [null, [Validators.required, Validators.maxLength(100)]],
  });

  constructor(protected genreService: GenreGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.updateForm(genre);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genre = this.createFromForm();
    if (genre.id !== undefined) {
      this.subscribeToSaveResponse(this.genreService.update(genre));
    } else {
      this.subscribeToSaveResponse(this.genreService.create(genre));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenreGraphqlDgs>>): void {
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

  protected updateForm(genre: IGenreGraphqlDgs): void {
    this.editForm.patchValue({
      id: genre.id,
      genreName: genre.genreName,
    });
  }

  protected createFromForm(): IGenreGraphqlDgs {
    return {
      ...new GenreGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      genreName: this.editForm.get(['genreName'])!.value,
    };
  }
}
