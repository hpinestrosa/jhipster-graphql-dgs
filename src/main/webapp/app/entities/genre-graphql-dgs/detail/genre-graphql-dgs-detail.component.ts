import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenreGraphqlDgs } from '../genre-graphql-dgs.model';

@Component({
  selector: 'jhi-genre-graphql-dgs-detail',
  templateUrl: './genre-graphql-dgs-detail.component.html',
})
export class GenreGraphqlDgsDetailComponent implements OnInit {
  genre: IGenreGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genre }) => {
      this.genre = genre;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
