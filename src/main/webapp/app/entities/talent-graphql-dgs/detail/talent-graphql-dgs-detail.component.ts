import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalentGraphqlDgs } from '../talent-graphql-dgs.model';

@Component({
  selector: 'jhi-talent-graphql-dgs-detail',
  templateUrl: './talent-graphql-dgs-detail.component.html',
})
export class TalentGraphqlDgsDetailComponent implements OnInit {
  talent: ITalentGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talent }) => {
      this.talent = talent;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
