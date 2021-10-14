import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILanguageGraphqlDgs } from '../language-graphql-dgs.model';

@Component({
  selector: 'jhi-language-graphql-dgs-detail',
  templateUrl: './language-graphql-dgs-detail.component.html',
})
export class LanguageGraphqlDgsDetailComponent implements OnInit {
  language: ILanguageGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ language }) => {
      this.language = language;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
