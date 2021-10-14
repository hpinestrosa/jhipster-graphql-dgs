import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleAkaGraphqlDgs } from '../title-aka-graphql-dgs.model';

@Component({
  selector: 'jhi-title-aka-graphql-dgs-detail',
  templateUrl: './title-aka-graphql-dgs-detail.component.html',
})
export class TitleAkaGraphqlDgsDetailComponent implements OnInit {
  titleAka: ITitleAkaGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleAka }) => {
      this.titleAka = titleAka;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
