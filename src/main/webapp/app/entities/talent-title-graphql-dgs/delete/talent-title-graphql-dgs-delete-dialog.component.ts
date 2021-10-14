import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITalentTitleGraphqlDgs } from '../talent-title-graphql-dgs.model';
import { TalentTitleGraphqlDgsService } from '../service/talent-title-graphql-dgs.service';

@Component({
  templateUrl: './talent-title-graphql-dgs-delete-dialog.component.html',
})
export class TalentTitleGraphqlDgsDeleteDialogComponent {
  talentTitle?: ITalentTitleGraphqlDgs;

  constructor(protected talentTitleService: TalentTitleGraphqlDgsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.talentTitleService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
