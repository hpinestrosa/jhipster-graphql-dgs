import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';

@Component({
  selector: 'jhi-talent-title-graphql-dgs-detail',
  templateUrl: './talent-title-graphql-dgs-detail.component.html',
})
export class TalentTitleGraphqlDgsDetailComponent implements OnInit {
  talentTitle: ITalentTitleGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talentTitle }) => {
      this.talentTitle = talentTitle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
