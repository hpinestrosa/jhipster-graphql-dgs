import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRoleGraphqlDgs } from '../role-graphql-dgs.model';
import { RoleGraphqlDgsService } from '../service/role-graphql-dgs.service';

@Component({
  templateUrl: './role-graphql-dgs-delete-dialog.component.html',
})
export class RoleGraphqlDgsDeleteDialogComponent {
  role?: IRoleGraphqlDgs;

  constructor(protected roleService: RoleGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.roleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
