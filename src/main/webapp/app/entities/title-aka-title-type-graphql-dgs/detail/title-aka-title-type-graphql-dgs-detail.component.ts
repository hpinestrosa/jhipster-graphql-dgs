import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleAkaTitleTypeGraphqlDgs } from '../title-aka-title-type-graphql-dgs.model';

@Component({
  selector: 'jhi-title-aka-title-type-graphql-dgs-detail',
  templateUrl: './title-aka-title-type-graphql-dgs-detail.component.html',
})
export class TitleAkaTitleTypeGraphqlDgsDetailComponent implements OnInit {
  titleAkaTitleType: ITitleAkaTitleTypeGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleAkaTitleType }) => {
      this.titleAkaTitleType = titleAkaTitleType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
