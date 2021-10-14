import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentRoleGraphqlDgs } from '../talent-role-graphql-dgs.model';
import { TalentRoleGraphqlDgsService } from '../service/talent-role-graphql-dgs.service';

@Component({
  templateUrl: './talent-role-graphql-dgs-delete-dialog.component.html',
})
export class TalentRoleGraphqlDgsDeleteDialogComponent {
  talentRole?: ITalentRoleGraphqlDgs;

  constructor(protected talentRoleService: TalentRoleGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.talentRoleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
