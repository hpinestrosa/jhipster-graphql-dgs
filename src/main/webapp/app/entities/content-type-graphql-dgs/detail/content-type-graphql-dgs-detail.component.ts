import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContentTypeGraphqlDgs } from '../content-type-graphql-dgs.model';

@Component({
  selector: 'jhi-content-type-graphql-dgs-detail',
  templateUrl: './content-type-graphql-dgs-detail.component.html',
})
export class ContentTypeGraphqlDgsDetailComponent implements OnInit {
  contentType: IContentTypeGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contentType }) => {
      this.contentType = contentType;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
