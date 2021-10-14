import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleTypeGraphqlDgs } from '../title-type-graphql-dgs.model';

@Component({
  selector: 'jhi-title-type-graphql-dgs-detail',
  templateUrl: './title-type-graphql-dgs-detail.component.html',
})
export class TitleTypeGraphqlDgsDetailComponent implements OnInit {
  titleType: ITitleTypeGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleType }) => {
      this.titleType = titleType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
