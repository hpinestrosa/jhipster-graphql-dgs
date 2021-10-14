import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRegionGraphqlDgs, RegionGraphqlDgs } from '../region-graphql-dgs.model';
import { RegionGraphqlDgsService } from '../service/region-graphql-dgs.service';

@Component({
  selector: 'jhi-region-graphql-dgs-update',
  templateUrl: './region-graphql-dgs-update.component.html',
})
export class RegionGraphqlDgsUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    regionName: [null, [Validators.maxLength(100)]],
  });

  constructor(protected regionService: RegionGraphqlDgsService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.updateForm(region);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.createFromForm();
    if (region.id !== undefined) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionGraphqlDgs>>): void {
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

  protected updateForm(region: IRegionGraphqlDgs): void {
    this.editForm.patchValue({
      id: region.id,
      regionName: region.regionName,
    });
  }

  protected createFromForm(): IRegionGraphqlDgs {
    return {
      ...new RegionGraphqlDgs(),
      id: this.editForm.get(['id'])!.value,
      regionName: this.editForm.get(['regionName'])!.value,
    };
  }
}
