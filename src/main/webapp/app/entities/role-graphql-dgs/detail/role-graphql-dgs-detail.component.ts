import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRoleGraphqlDgs } from '../role-graphql-dgs.model';

@Component({
  selector: 'jhi-role-graphql-dgs-detail',
  templateUrl: './role-graphql-dgs-detail.component.html',
})
export class RoleGraphqlDgsDetailComponent implements OnInit {
  role: IRoleGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ role }) => {
      this.role = role;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
