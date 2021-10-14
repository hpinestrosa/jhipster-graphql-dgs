import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentGraphqlDgs } from '../talent-graphql-dgs.model';
import { TalentGraphqlDgsService } from '../service/talent-graphql-dgs.service';

@Component({
  templateUrl: './talent-graphql-dgs-delete-dialog.component.html',
})
export class TalentGraphqlDgsDeleteDialogComponent {
  talent?: ITalentGraphqlDgs;

  constructor(protected talentService: TalentGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.talentService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
