import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionGraphqlDgs } from '../region-graphql-dgs.model';

@Component({
  selector: 'jhi-region-graphql-dgs-detail',
  templateUrl: './region-graphql-dgs-detail.component.html',
})
export class RegionGraphqlDgsDetailComponent implements OnInit {
  region: IRegionGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.region = region;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
