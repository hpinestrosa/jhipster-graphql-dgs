import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';

@Component({
  selector: 'jhi-talent-role-graphql-dgs-detail',
  templateUrl: './talent-role-graphql-dgs-detail.component.html',
})
export class TalentRoleGraphqlDgsDetailComponent implements OnInit {
  talentRole: ITalentRoleGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ talentRole }) => {
      this.talentRole = talentRole;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
