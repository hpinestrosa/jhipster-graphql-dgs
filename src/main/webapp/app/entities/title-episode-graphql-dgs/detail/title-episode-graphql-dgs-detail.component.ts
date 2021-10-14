import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleEpisodeGraphqlDgs } from '../title-episode-graphql-dgs.model';

@Component({
  selector: 'jhi-title-episode-graphql-dgs-detail',
  templateUrl: './title-episode-graphql-dgs-detail.component.html',
})
export class TitleEpisodeGraphqlDgsDetailComponent implements OnInit {
  titleEpisode: ITitleEpisodeGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titleEpisode }) => {
      this.titleEpisode = titleEpisode;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
