import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoryGraphqlDgs } from '../category-graphql-dgs.model';

@Component({
  selector: 'jhi-category-graphql-dgs-detail',
  templateUrl: './category-graphql-dgs-detail.component.html',
})
export class CategoryGraphqlDgsDetailComponent implements OnInit {
  category: ICategoryGraphqlDgs | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ category }) => {
      this.category = category;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
