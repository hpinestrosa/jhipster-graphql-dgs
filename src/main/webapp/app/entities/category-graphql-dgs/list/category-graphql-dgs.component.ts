import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoryGraphqlDgs } from '../category-graphql-dgs.model';
import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';
import { CategoryGraphqlDgsDeleteDialogComponent } from '../delete/category-graphql-dgs-delete-dialog.component';

@Component({
  selector: 'jhi-category-graphql-dgs',
  templateUrl: './category-graphql-dgs.component.html',
})
export class CategoryGraphqlDgsComponent implements OnInit {
  categories?: ICategoryGraphqlDgs[];
  isLoading = false;

  constructor(protected categoryService: CategoryGraphqlDgsService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.categoryService.query().subscribe(
      (res: HttpResponse<ICategoryGraphqlDgs[]>) => {
        this.isLoading = false;
        this.categories = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: ICategoryGraphqlDgs): number {
    return item.id!;
  }

  delete(category: ICategoryGraphqlDgs): void {
    const modalRef = this.modalService.open(CategoryGraphqlDgsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.category = category;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
