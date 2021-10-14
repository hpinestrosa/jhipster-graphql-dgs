import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitleGraphqlDgs } from '../title-graphql-dgs.model';

@Component({
  selector: 'jhi-title-graphql-dgs-detail',
  templateUrl: './title-graphql-dgs-detail.component.html',
})
export class TitleGraphqlDgsDetailComponent implements OnInit {
  title: ITitleGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ title }) => {
      this.title = title;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
