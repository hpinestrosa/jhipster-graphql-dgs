import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleGenreGraphqlDgs } from '../title-genre-graphql-dgs.model';

@Component({
  selector: 'jhi-title-genre-graphql-dgs-detail',
  templateUrl: './title-genre-graphql-dgs-detail.component.html',
})
export class TitleGenreGraphqlDgsDetailComponent implements OnInit {
  titleGenre: ITitleGenreGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleGenre }) => {
      this.titleGenre = titleGenre;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
