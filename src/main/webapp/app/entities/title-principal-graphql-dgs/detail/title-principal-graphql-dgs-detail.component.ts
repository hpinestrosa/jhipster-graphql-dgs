import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITitlePrincipalGraphqlDgs } from '../title-principal-graphql-dgs.model';

@Component({
  selector: 'jhi-title-principal-graphql-dgs-detail',
  templateUrl: './title-principal-graphql-dgs-detail.component.html',
})
export class TitlePrincipalGraphqlDgsDetailComponent implements OnInit {
  titlePrincipal: ITitlePrincipalGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ titlePrincipal }) => {
      this.titlePrincipal = titlePrincipal;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
