import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoryGraphqlDgs } from '../category-graphql-dgs.model';
import { CategoryGraphqlDgsService } from '../service/category-graphql-dgs.service';

@Component({
  templateUrl: './category-graphql-dgs-delete-dialog.component.html',
})
export class CategoryGraphqlDgsDeleteDialogComponent {
  category?: ICategoryGraphqlDgs;

  constructor(protected categoryService: CategoryGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoryService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
