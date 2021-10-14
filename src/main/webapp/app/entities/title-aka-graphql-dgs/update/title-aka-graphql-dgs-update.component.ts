import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITitleAkaGraphqlDgs, TitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';
import { TitleAkaGraphqlDgsService } from '../service/title-aka-graphql-dgs.service';
import { IRegionGraphqlDgs } from 'app/entities/region-graphql-dgs/region-graphql-dgs.model';
import { RegionGraphqlDgsService } from 'app/entities/region-graphql-dgs/service/region-graphql-dgs.service';
import { ILanguageGraphqlDgs } from 'app/entities/language-graphql-dgs/language-graphql-dgs.model';
import { LanguageGraphqlDgsService } from 'app/entities/language-graphql-dgs/service/language-graphql-dgs.service';

@Component({
  selector: 'jhi-title-aka-graphql-dgs-update',
  templateUrl: './title-aka-graphql-dgs-update.component.html',
})
export class TitleAkaGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  regionsCollection: IRegionGraphqlDgs[] = [];
  languagesCollection: ILanguageGraphqlDgs[] = [];

  editForm = this.fb.group({
    id: [],
    akaTitle: [null, [Validators.required, Validators.maxLength(500)]],
    additionalAttrs: [null, [Validators.maxLength(500)]],
    isOriginalTitle: [],
    region: [],
    language: [],
  });

  constructor(
    protected titleAkaService: TitleAkaGraphqlDgsService,
    protected regionService: RegionGraphqlDgsService,
    protected languageService: LanguageGraphqlDgsService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleAka }) => {
      this.updateForm(titleAka);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const titleAka = this.createFromForm();
    if (titleAka.id !== undefined) {
      this.subscribeToSaveResponse(this.titleAkaService.update(titleAka));
    } else {
      this.subscribeToSaveResponse(this.titleAkaService.create(titleAka));
    }
  }

  trackRegionGraphqlDgsById(index: number, item: IRegionGraphqlDgs): number {
    return item.id!;
  }

  trackLanguageGraphqlDgsById(index: number, item: ILanguageGraphqlDgs): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITitleAkaGraphqlDgs>>): void {
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

  protected updateForm(titleAka: ITitleAkaGraphqlDgs): void {
    this.editForm.patchValue({
      id: titleAka.id,
      akaTitle: titleAka.akaTitle,
      additionalAttrs: titleAka.additionalAttrs,
      isOriginalTitle: titleAka.isOriginalTitle,
      region: titleAka.region,
      language: titleAka.language,
    });

    this.regionsCollection = this.regionService.addRegionGraphqlDgsToCollectionIfMissing(this.regionsCollection, titleAka.region);
    this.languagesCollection = this.languageService.addLanguageGraphqlDgsToCollectionIfMissing(this.languagesCollection, titleAka.language);
  }

  protected loadRelationshipsOptions(): void {
    this.regionService
      .query({ filter: 'titleaka-is-null' })
      .pipe(map((res: HttpResponse<IRegionGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((regions: IRegionGraphqlDgs[]) =>
          this.regionService.addRegionGraphqlDgsToCollectionIfMissing(regions, this.editForm.get('region')!.value)
        )
      )
      .subscribe((regions: IRegionGraphqlDgs[]) => (this.regionsCollection = regions));

    this.languageService
      .query({ filter: 'titleaka-is-null' })
      .pipe(map((res: HttpResponse<ILanguageGraphqlDgs[]>) => res.body ?? []))
      .pipe(
        map((languages: ILanguageGraphqlDgs[]) =>
          this.languageService.addLanguageGraphqlDgsToCollectionIfMissing(languages, this.editForm.get('language')!.value)
        )
      )
      .subscribe((languages: ILanguageGraphqlDgs[]) => (this.languagesCollection = languages));
  }

  protected createFromForm(): ITitleAkaGraphqlDgs {
    return {
      ...new TitleAkaGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      akaTitle: this.editForm.get(['akaTitle'])!.value,
      additionalAttrs: this.editForm.get(['additionalAttrs'])!.value,
      isOriginalTitle: this.editForm.get(['isOriginalTitle'])!.value,
      region: this.editForm.get(['region'])!.value,
      language: this.editForm.get(['language'])!.value,
    };
  }
}
